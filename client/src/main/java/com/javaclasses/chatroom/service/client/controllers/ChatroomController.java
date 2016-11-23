package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.DTO.RequestError;
import com.javaclasses.chatroom.service.EmptyMessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/api/chatroom/{chatroomId}")
public class ChatroomController {

    @Autowired
    private ChatroomService chatroomService;

    @MessageMapping("/sendMessage") // TODO: 11/22/2016 test
    @SendTo("/topic/greetings")
    public MessageDTO sendMessage(@RequestBody MessageDTO messageDTO,@PathVariable Long chatroomId) {
        // TODO: 11/22/2016 return message
        try {
            return chatroomService.postMessage(messageDTO, chatroomId, Date.from(Instant.now()));
        } catch (EmptyMessageException e) {
            e.printStackTrace();
            return null;
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
