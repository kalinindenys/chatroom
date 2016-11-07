package com.javaclasses.chatroom.services;

import com.javaclasses.chatroom.entities.Chatroom;
import com.javaclasses.chatroom.entities.Message;
import com.javaclasses.chatroom.entities.User;

import java.util.Date;
import java.util.List;

public interface ChatroomService {
    List<Chatroom> getChatroomList(Long userid);

    Chatroom getChatroom(Long chatroomId);

    Message getMessages(Long chatroomId);

    User getChatroomMemberList(Long chatroomId);

    void postMessage(Long chatroomId, Long userId, String messageContent, Date date);
}
