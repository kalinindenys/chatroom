package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.EmptyMessageException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ChatroomServiceImpl implements ChatroomService {
    @Autowired
    ChatroomRepository chatroomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    public Iterable<Chatroom> getChatroomList(Long userId) {
        return userRepository.findOne(userId).getChatroomList();
    }

    public Chatroom getChatroom(Long chatroomId) {
        return chatroomRepository.findOne(chatroomId);
    }

    public Iterable<Message> getMessages(Long chatroomId) {
        List<Message> messages = chatroomRepository.findOne(chatroomId).getMessages();
        return messages;
    }

    public Iterable<User> getChatroomMemberList(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findOne(chatroomId);
        return chatroom.getMembers();
    }

    public void postMessage(MessageDTO message) throws EmptyMessageException {
        String content = message.getContent();
        if (null == content || content.trim().isEmpty())
            throw new EmptyMessageException(message.toString() + " has empty content");
        else {
            messageRepository.save(new Message(message.getId(), message.getAuthor(), message.getChatroom(), message.getContent(), message.getDate()));
        }
    }
}
