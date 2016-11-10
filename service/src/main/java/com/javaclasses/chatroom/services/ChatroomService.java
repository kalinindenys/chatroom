package com.javaclasses.chatroom.services;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.services.DTO.MessageDTO;
import com.javaclasses.chatroom.services.exception.EmptyMessageException;
import org.springframework.stereotype.Service;


@Service
public interface ChatroomService {
    Iterable<Chatroom> getChatroomList(Long userid);

    Chatroom getChatroom(Long chatroomId);

    Iterable<Message> getMessages(Long chatroomId);

    Iterable<User> getChatroomMemberList(Long chatroomId);

    void postMessage(MessageDTO message) throws EmptyMessageException;
}
