package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.EmptyMessageException;
import com.javaclasses.chatroom.service.impl.ChatroomServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ChatroomServiceTest {

    @Configuration
    static class ChatroomServiceTestContextConfiguration {

        @Bean
        public ChatroomService chatroomService() {
            return new ChatroomServiceImpl();
        }

        @Bean
        public UserRepository userRepository() {
            return Mockito.mock(UserRepository.class);
        }

        @Bean
        public MessageRepository messageRepository() {
            return Mockito.mock(MessageRepository.class);
        }

        @Bean
        public ChatroomRepository chatroomRepository() {
            return Mockito.mock(ChatroomRepository.class);
        }

    }

    @Autowired
    private ChatroomService chatroomService = Mockito.mock(ChatroomService.class);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatroomRepository chatroomRepository;

    User mockUser1 = new User(1L, "vasyazmeypro", "66613666", null);
    User mockUser2 = new User(2L, "rusty228", "qwerty123", null);
    Chatroom motoChat = new Chatroom(2114L, "Motoclub", null, null);
    List<Chatroom> chatrooms = new ArrayList<>();
    List<User> users = new ArrayList<>();
    List<Message> messages = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        List<Long> chatroomIds = new ArrayList();
        chatroomIds.add(2112L);
        chatroomIds.add(2113L);
        chatroomIds.add(2114L);

        List<Long> userIds = new ArrayList();
        userIds.add(1L);
        userIds.add(2L);

        List<Long> messageIds = new ArrayList();
        messageIds.add(61L);
        messageIds.add(62L);
        messageIds.add(63L);


        users.add(mockUser1);
        users.add(mockUser2);


        Chatroom nyChat = new Chatroom(2112L, "New York chat", users, null);
        Chatroom animeChat = new Chatroom(2113L, "Anime kawaii", users, null);
        motoChat.setMembers(users);
        chatrooms.add(nyChat);
        chatrooms.add(animeChat);
        chatrooms.add(motoChat);


        messages.add(new Message(61L, mockUser1, motoChat, "Hello", LocalDateTime.now()));
        messages.add(new Message(62L, mockUser2, motoChat, "Bye", LocalDateTime.now()));
        messages.add(new Message(63L, mockUser1, motoChat, "Ok", LocalDateTime.now()));

        List<Chatroom> chatsOfMockUser = new ArrayList<>();
        chatsOfMockUser.add(nyChat);
        chatsOfMockUser.add(animeChat);

        mockUser1.setChatroomList(chatrooms);
        mockUser2.setChatroomList(chatrooms);
        motoChat.setMessages(messages);


        Mockito.when(userRepository.findOne(1L)).thenReturn(mockUser1);
        Mockito.when(userRepository.findOne(2L)).thenReturn(mockUser2);

        Mockito.when(chatroomRepository.findAll(chatroomIds)).thenReturn(chatrooms);
        Mockito.when(chatroomRepository.findOne(2114L)).thenReturn(motoChat);

        Mockito.when(messageRepository.findAll(messageIds)).thenReturn(messages);

    }

    @After
    public void tearDown() {
    }

    @Test
    public void getChatroomList() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getChatroomList(1L);
        System.out.println(chatroomList);
        assertEquals(chatroomList, this.chatrooms);

    }

    @Test
    public void getChatroom() throws Exception {
        Chatroom chatroom = chatroomService.getChatroom(2114L);
        System.out.println(chatroom);
        assertEquals(chatroom, this.motoChat);

    }

    @Test
    public void getMessages() throws Exception {
        Iterable<Message> messages = chatroomService.getMessages(2114L);
        System.out.println(messages);
        assertEquals(messages, this.messages);

    }

    @Test
    public void getChatroomMemberList() throws Exception {
        Iterable<User> chatroomMemberList = chatroomService.getChatroomMemberList(2114L);
        System.out.println(chatroomMemberList);
        assertEquals(chatroomMemberList, this.motoChat.getMembers());

    }

    @Test
    public void postMessage() throws Exception {
        chatroomService.postMessage(new MessageDTO(64L, mockUser2, motoChat, "yep", LocalDateTime.now()));

    }

    @Test
    public void postNullMessage() throws Exception {
        try {
            chatroomService.postMessage(null);
            assert false;
        } catch (NullPointerException npe) {
            assert true;
        }
    }

    @Test
    public void postEmptyMessage() throws Exception {
        try {
            chatroomService.postMessage(new MessageDTO(64L, mockUser2, motoChat, null, LocalDateTime.now()));
            assert false;
        } catch (EmptyMessageException eme) {
            assert true;
        }
    }

    @Test
    public void getAllChatroomsTest() throws Exception {
        chatroomService.getAllChatrooms(1);
    }

}