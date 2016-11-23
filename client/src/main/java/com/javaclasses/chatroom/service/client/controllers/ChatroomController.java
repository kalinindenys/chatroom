package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.dto.MessageDTO;
import com.javaclasses.chatroom.service.dto.RequestError;
import com.javaclasses.chatroom.service.EmptyMessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/api/chatroom")
public class ChatroomController {

    @Autowired
    private ChatroomService chatroomService;

    @PostMapping("/{chatroomId}/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO,@PathVariable Long chatroomId) {
        try {
            chatroomService.postMessage(messageDTO, chatroomId, Date.from(Instant.now()));
            return ResponseEntity.ok(chatroomService.getMessages(chatroomId));
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
