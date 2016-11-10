package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.service.ChatroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatroomList")
public class ChatroomListController {

    @Autowired
    ChatroomService chatroomService;

    @GetMapping("/getChatroomList/{userId}")
    public ResponseEntity<?> getChatroomList(@PathVariable Long userId) {
        return ResponseEntity.ok(chatroomService.getChatroomList(userId));
    }

    @GetMapping("/selectChatroom/{chatroomId}")
    public ResponseEntity<?> selectChatroom(@PathVariable Long chatroomId) {
        return ResponseEntity.ok(chatroomService.getChatroom(chatroomId));
    }
}
