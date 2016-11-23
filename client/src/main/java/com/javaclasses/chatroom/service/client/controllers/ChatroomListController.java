package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.service.ChatroomNotFoundException;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.tinytypes.RequestError;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import static org.slf4j.LoggerFactory.getLogger;

@RestController
@RequestMapping("/api/chatroomList")
public class ChatroomListController {
    private static final Logger LOGGER = getLogger(ChatroomListController.class);

    @Autowired
    private ChatroomService chatroomService;

    @GetMapping("/getMyChatrooms/{userId}")
    public ResponseEntity<?> getMyChatroomList(@PathVariable Long userId) {
        try {
            Iterable<Chatroom> chatroomList = chatroomService.getUserChatroomList(userId);
            return ResponseEntity.ok(chatroomList);
        } catch (ChatroomNotFoundException e) {
            LOGGER.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(e.getMessage()));
        }
    }

    @GetMapping("/selectChatroom/{chatroomId}")
    public ResponseEntity<?> selectChatroom(@PathVariable Long chatroomId) {
        try {
            Chatroom chatroom = chatroomService.getChatroom(chatroomId);
            return ResponseEntity.ok(chatroom);
        } catch (ChatroomNotFoundException e) {
            LOGGER.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(e.getMessage()));
        }
    }

    @GetMapping("/findChatroom/{chatroomName}")
    public ResponseEntity<?> findChatroom(@PathVariable String name) {
        Iterable<Chatroom> chatroomsByName = chatroomService.findChatroomsByName(name);
        return ResponseEntity.ok(chatroomsByName);
    }

    @GetMapping("/showAllChatrooms")
    public ResponseEntity<?> selectChatroom() {
        Iterable<Chatroom> chatroomsByName = chatroomService.getAllChatrooms();
        return ResponseEntity.ok(chatroomsByName);
    }


}
