package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.dto.ChatroomId;
import com.javaclasses.chatroom.service.dto.ChatroomName;
import com.javaclasses.chatroom.service.dto.MessageDTO;
import com.javaclasses.chatroom.service.dto.UserId;

import java.util.Date;


public interface ChatroomService {
    Iterable<Chatroom> getAllChatrooms();

    Iterable<Chatroom> getUserChatroomList(Long userid) throws ChatroomNotFoundException;

    Chatroom getChatroom(Long chatroomId) throws ChatroomNotFoundException;

    Iterable<Chatroom> findChatroomsByName(String name);

    Iterable<Message> getMessages(Long chatroomId);

    MessageDTO postMessage(MessageDTO message, Long chatroomId, Date date) throws EmptyMessageException;

    Iterable<User> getChatroomMemberList(Long chatroomId);

    void createChatroom(ChatroomName chatroomName, UserId ownerId);

    void joinChatroom(ChatroomId chatroomId, UserId userId);

    void leaveChatroom(ChatroomId chatroomId, UserId userId);

    void renameChatroom(ChatroomId chatroomId, ChatroomName chatroomName);
}
