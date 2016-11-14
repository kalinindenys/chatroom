package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.ChatroomNotFoundException;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.EmptyMessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatroomServiceImpl implements ChatroomService {
    @Autowired
    ChatroomRepository chatroomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    public Iterable<Chatroom> getChatroomList(Long userId) throws ChatroomNotFoundException {
        if (null == userId || !userRepository.exists(userId)) {
            String message = "Chatrooms for user with id '" + userId + "' not found";
            throw new ChatroomNotFoundException(message);
        }
        return userRepository.findOne(userId).getChatroomList();
    }

    public Chatroom getChatroom(Long chatroomId) throws ChatroomNotFoundException {
        if (null == chatroomId|| !userRepository.exists(chatroomId)){
            String message = "Chatrooms for user with id '" + chatroomId + "' not found";
            throw new ChatroomNotFoundException(message);
        }
        return chatroomRepository.findOne(chatroomId);
    }

    public Iterable<Chatroom> findChatroomsByName(String name) {
        return chatroomRepository.findAllByName(name);
    }

    public Iterable<Message> getMessages(Long chatroomId) {
        List<Message> messages = chatroomRepository.findOne(chatroomId).getMessages();
        return messages;
    }

    public Iterable<User> getChatroomMemberList(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findOne(chatroomId);
        return chatroom.getMembers();
    }

    public void postMessage(MessageDTO message, Long chatroomId) throws EmptyMessageException {
        String content = message.getContent();
        if (null == content || content.trim().isEmpty())
            throw new EmptyMessageException(message.toString() + " has empty content");
        else {
            messageRepository.save(new Message(message.getAuthor(), chatroomRepository.findOne(chatroomId), message.getContent(), LocalDateTime.now()));
            // TODO: 11/14/2016 add MessagePostException
        }
    }

    public Iterable<Chatroom> getAllChatrooms() {
        return chatroomRepository.findAll();
    }
}
