package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.MessageDTO;


public interface ChatroomService {
    Iterable<Chatroom> getChatroomList(Long userid);

    Chatroom getChatroom(Long chatroomId);

    Iterable<Chatroom> findChatroom(String name);

    Iterable<Message> getMessages(Long chatroomId);

    Iterable<User> getChatroomMemberList(Long chatroomId);

    void postMessage(MessageDTO message, Long chatroomId) throws EmptyMessageException;

    Iterable<Chatroom> getAllChatrooms();
}
