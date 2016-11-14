package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.impl.ChatroomServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ChatroomServiceTest {
    private static final Logger LOGGER = getLogger(ChatroomServiceTest.class);

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

    private User mockUser1 = new User("vasyazmeypro", "66613666", null);
    private User mockUser2 = new User("rusty228", "qwerty123", null);
    private Chatroom motoChat = new Chatroom("Motoclub", null, null);
    private List<Chatroom> chatrooms = new ArrayList<>();
    private List<User> users = new ArrayList<>();
    private List<Message> messages = new ArrayList<>();
    private List<Chatroom> foundByNameChatrooms = new ArrayList<>();

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


        Chatroom nyChat = new Chatroom("New York chat", users, null);
        Chatroom animeChat = new Chatroom("Anime kawaii", users, null);
        motoChat.setMembers(users);
        chatrooms.add(nyChat);
        chatrooms.add(animeChat);
        chatrooms.add(motoChat);


        messages.add(new Message(mockUser1, motoChat, "Hello", LocalDateTime.now()));
        messages.add(new Message(mockUser2, motoChat, "Bye", LocalDateTime.now()));
        messages.add(new Message(mockUser1, motoChat, "Ok", LocalDateTime.now()));

        List<Chatroom> chatsOfMockUser = new ArrayList<>();
        chatsOfMockUser.add(nyChat);
        chatsOfMockUser.add(animeChat);

        mockUser1.setChatroomList(chatrooms);
        mockUser2.setChatroomList(chatrooms);
        motoChat.setMessages(messages);


        Mockito.when(userRepository.findOne(1L)).thenReturn(mockUser1);
        Mockito.when(userRepository.findOne(2L)).thenReturn(mockUser2);

        Mockito.when(chatroomRepository.findAll()).thenReturn(chatrooms);
        Mockito.when(chatroomRepository.findOne(2114L)).thenReturn(motoChat);
        Mockito.when(userRepository.exists(1L)).thenReturn(true);


        foundByNameChatrooms.add(motoChat);
        Mockito.when(chatroomRepository.findAllByName("Motoclub")).thenReturn(foundByNameChatrooms);
        Mockito.when(messageRepository.findAll(messageIds)).thenReturn(messages);

    }

    @After
    public void tearDown() {
    }

    @Test
    public void getChatroomList() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getChatroomList(1L);
        LOGGER.info(chatroomList.toString());
        assertEquals(chatroomList, this.chatrooms);

    }

    @Test
    public void getChatroom() throws Exception {
        Chatroom chatroom = chatroomService.getChatroom(2114L);
        LOGGER.info(chatroom.toString());
        assertEquals(chatroom, this.motoChat);

    }

    @Test
    public void getMessages() throws Exception {
        Iterable<Message> messages = chatroomService.getMessages(2114L);
        LOGGER.info(messages.toString());
        assertEquals(messages, this.messages);

    }

    @Test
    public void getChatroomMemberList() throws Exception {
        Iterable<User> chatroomMemberList = chatroomService.getChatroomMemberList(2114L);
        LOGGER.info(chatroomMemberList.toString());
        assertEquals(chatroomMemberList, this.motoChat.getMembers());

    }

    @Test
    public void postMessage() throws Exception {
        chatroomService.postMessage(new MessageDTO(mockUser2, "yep"), motoChat.getId());

    }

    @Test
    public void postNullMessage() throws Exception {
        try {
            chatroomService.postMessage(null, null);
            assert false;
        } catch (NullPointerException npe) {
            assert true;
        }
    }

    @Test
    public void postEmptyMessage() throws Exception {
        try {
            chatroomService.postMessage(new MessageDTO(mockUser2, null), motoChat.getId());
            assert false;
        } catch (EmptyMessageException eme) {
            assert true;
        }
    }

    @Test
    public void getAllChatroomsTest() throws Exception {
        Iterable<Chatroom> allChatrooms = chatroomService.getAllChatrooms();
        LOGGER.info(allChatrooms.toString());
        assertEquals(chatrooms, allChatrooms);
    }

    @Test
    public void findChatroomTest() throws Exception {
        Iterable<Chatroom> chatroom = chatroomService.findChatroomsByName("Motoclub");
        LOGGER.info(chatroom.toString());
        assertEquals(foundByNameChatrooms, chatroom);
    }

}