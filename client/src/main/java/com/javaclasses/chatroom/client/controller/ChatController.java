package com.javaclasses.chatroom.client.controller;

import com.javaclasses.chatroom.services.ChatroomService;
import com.javaclasses.chatroom.services.DTO.MessageDTO;
import com.javaclasses.chatroom.services.DTO.RequestError;
import com.javaclasses.chatroom.services.exception.EmptyMessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    ChatroomService chatroomService;

    @PostMapping("/{chatroomId}/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO,@PathVariable Long chatroomId) {
        try {
            chatroomService.postMessage(messageDTO);
            return ResponseEntity.ok(chatroomService.getMessages(messageDTO.getChatroom().getId()));
        } catch (EmptyMessageException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(e.getMessage()));
        }
    }

    @GetMapping("/{chatroomId}/updateMessages")
    public ResponseEntity<?> getMessages(@PathVariable Long chatroomId) {
        try {
            return ResponseEntity.ok(chatroomService.getMessages(chatroomId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(e.getMessage()));
        }
    }
}
