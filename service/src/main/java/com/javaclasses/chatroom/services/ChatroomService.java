package com.javaclasses.chatroom.services;

import com.javaclasses.chatroom.persistence.entities.Chatroom;
import com.javaclasses.chatroom.persistence.entities.Message;
import com.javaclasses.chatroom.persistence.entities.User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface ChatroomService {
    Iterable<Chatroom> getChatroomList(Long userid);

    Chatroom getChatroom(Long chatroomId);

    Iterable<Message> getMessages(Long chatroomId);

    Iterable<User> getChatroomMemberList(Long chatroomId);

    void postMessage(Long chatroomId, Long userId, String messageContent, Date date);
}
