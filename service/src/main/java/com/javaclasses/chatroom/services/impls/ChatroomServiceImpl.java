package com.javaclasses.chatroom.services.impls;

import com.javaclasses.chatroom.ChatroomRepository;
import com.javaclasses.chatroom.MessageRepository;
import com.javaclasses.chatroom.UserRepository;
import com.javaclasses.chatroom.entities.Chatroom;
import com.javaclasses.chatroom.entities.Message;
import com.javaclasses.chatroom.entities.User;
import com.javaclasses.chatroom.services.ChatroomService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class ChatroomServiceImpl implements ChatroomService {
    @Autowired
    ChatroomRepository chatroomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    public Iterable<Chatroom> getChatroomList(Long userId) {
        List<Long> ids = userRepository.findOne(userId).getChatroomIdList();
        return chatroomRepository.findAll(ids);
    }

    public Chatroom getChatroom(Long chatroomId) {
        return chatroomRepository.findOne(chatroomId);
    }

    public Iterable<Message> getMessages(Long chatroomId) {
        List<Long> messageIds = chatroomRepository.findOne(chatroomId).getMessageIds();
        return messageRepository.findAll(messageIds);
    }

    public Iterable<User> getChatroomMemberList(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findOne(chatroomId);
        return userRepository.findAll(chatroom.getMemberIdList());
    }

    public void postMessage(Long chatroomId, Long userId, String messageContent, Date date) {

    }
}
