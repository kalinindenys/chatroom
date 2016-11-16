package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.MessageDTO;


public interface ChatroomService {
    Iterable<Chatroom> getAllChatrooms();

    Iterable<Chatroom> getChatroomList(Long userid) throws ChatroomNotFoundException;

    Chatroom getChatroom(Long chatroomId) throws ChatroomNotFoundException;

    Iterable<Chatroom> findChatroomsByName(String name);

    Iterable<Message> getMessages(Long chatroomId);

    void postMessage(MessageDTO message, Long chatroomId) throws EmptyMessageException;

    Iterable<User> getChatroomMemberList(Long chatroomId);
}
