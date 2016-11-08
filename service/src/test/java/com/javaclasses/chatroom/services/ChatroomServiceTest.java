package com.javaclasses.chatroom.services;

import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entities.Chatroom;
import com.javaclasses.chatroom.persistence.entities.Message;
import com.javaclasses.chatroom.persistence.entities.User;
import com.javaclasses.chatroom.services.impls.ChatroomServiceImpl;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private ChatroomService chatroomService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatroomRepository chatroomRepository;

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

        List<Chatroom> chatrooms = new ArrayList();
        Chatroom nyChat = new Chatroom(2112L, "New York chat", userIds, null);
        Chatroom animeChat = new Chatroom(2113L, "Anime kawaii", userIds, null);
        Chatroom motoChat = new Chatroom(2114L, "Motoclub", userIds, messageIds);
        chatrooms.add(nyChat);
        chatrooms.add(animeChat);
        chatrooms.add(motoChat);

        List<Chatroom> chatsOfMockUser = new ArrayList<>();
        chatsOfMockUser.add(nyChat);
        chatsOfMockUser.add(animeChat);

        List<User> users = new ArrayList<>();
        User mockUser1 = new User(1L, "vasyazmeypro", "66613666", chatroomIds);
        User mockUser2 = new User(2L, "rusty228", "qwerty123", chatroomIds);
        users.add(mockUser1);
        users.add(mockUser2);

        List<Message> messages = new ArrayList<>();
        messages.add(new Message(61L, mockUser1.getId(), motoChat.getId(), "Hello", new Date(201601010001L)));
        messages.add(new Message(62L, mockUser2.getId(), motoChat.getId(), "Bye", new Date(201601010002L)));
        messages.add(new Message(63L, mockUser1.getId(), motoChat.getId(), "Ok", new Date(201601010003L)));

        Mockito.when(userRepository.findOne(1L)).thenReturn(mockUser1);
        Mockito.when(userRepository.findOne(2L)).thenReturn(mockUser2);
        Mockito.when(userRepository.findAll(motoChat.getMemberIdList())).thenReturn(users);

        Mockito.when(chatroomRepository.findAll(chatroomIds)).thenReturn(chatrooms);
        Mockito.when(chatroomRepository.findOne(2114L)).thenReturn(motoChat);

        Mockito.when(messageRepository.findAll(messageIds)).thenReturn(messages);

    }

    @After
    public void tearDown() {
    }

    @Test
    public void getChatroomList() throws Exception {
        //chatroomService.getChatroomList(1L);

    }

    @Test
    public void getChatroom() throws Exception {

    }

    @Test
    public void getMessages() throws Exception {

    }

    @Test
    public void getChatroomMemberList() throws Exception {

    }

    @Test
    public void postMessage() throws Exception {

    }

}