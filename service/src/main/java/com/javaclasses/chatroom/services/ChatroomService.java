package com.javaclasses.chatroom.services;

import com.javaclasses.chatroom.entities.Chatroom;
import com.javaclasses.chatroom.entities.Message;
import com.javaclasses.chatroom.entities.User;

import java.util.Date;

public interface ChatroomService {
    Iterable<Chatroom> getChatroomList(Long userid);

    Chatroom getChatroom(Long chatroomId);

    Iterable<Message> getMessages(Long chatroomId);

    Iterable<User> getChatroomMemberList(Long chatroomId);

    void postMessage(Long chatroomId, Long userId, String messageContent, Date date);
}
