package com.javaclasses.chatroom.hsqlmem;

import com.javaclasses.chatroom.config.SpringDataTestConfig;
import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.dto.ChatroomId;
import com.javaclasses.chatroom.service.dto.ChatroomName;
import com.javaclasses.chatroom.service.dto.MessageDTO;
import com.javaclasses.chatroom.service.dto.UserId;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringDataTestConfig.class})
@WebAppConfiguration
@Transactional
public class InMemoryChatroomServiceTest {

    @Autowired
    ChatroomService chatroomService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatroomRepository chatroomRepository;

    @Autowired
    MessageRepository messageRepository;

    private User mockUser1;
    private User mockUser2;
    private User mockUser3;
    private Chatroom mockChatroom1;
    private Chatroom mockChatroom2;
    private Message mockMessage1;
    private Message mockMessage2;

    private ArrayList<User> users = new ArrayList<>();
    private ArrayList<Chatroom> chats = new ArrayList<>();
    private ArrayList<Message> messages = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        mockUser1 = userRepository.save(new User("user1", "password1"));
        mockUser2 = userRepository.save(new User("user2", "password2"));
        mockUser3 = userRepository.save(new User("user3", "password3"));

        mockChatroom1 = chatroomRepository.save(new Chatroom("chatroom1"));
        mockChatroom2 = chatroomRepository.save(new Chatroom("chatroom2"));

        mockMessage1 = messageRepository.save(new Message(mockUser1, mockChatroom1, "Hello", Date.from(Instant.now())));
        mockMessage2 = messageRepository.save(new Message(mockUser2, mockChatroom1, "Bye", Date.from(Instant.now())));


        users.add(mockUser1);
        users.add(mockUser2);

        chats.add(mockChatroom1);
        chats.add(mockChatroom2);

        messages.add(mockMessage1);
        messages.add(mockMessage2);

        mockChatroom1.setMembers(users);
        mockChatroom2.setMembers(users);
        mockChatroom1.setMessages(messages);
        mockChatroom2.setMessages(messages);

        mockUser1.setChatrooms(chats);

        mockUser1 = userRepository.save(mockUser1);

       /* mockChatroom1 = chatroomRepository.save(mockChatroom1);
        mockChatroom2 = chatroomRepository.save(mockChatroom2);

        mockMessage1 = messageRepository.save(mockMessage1);
        mockMessage1 = messageRepository.save(mockMessage2);
*/
    }

    @Test
    @Transactional
    public void testGetAllChatrooms() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getAllChatrooms();
        List<Chatroom> answer = new ArrayList<>();
        convertPersistentBagToChatroomArrayList(chatroomList, answer);
        assertEquals("method getAllChatrooms returned wrong chatrooms", chats, answer);
    }

    @Test
    @Transactional
    public void testGetUserChatroomList() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getUserChatroomList(mockUser1.getId());
        List<Chatroom> answer = new ArrayList<>();
        convertPersistentBagToChatroomArrayList(chatroomList, answer);
        assertEquals("method getUserChatroomList returned wrong chatrooms", chats, answer);
    }

    @Test
    @Transactional
    public void testGetChatroom() throws Exception {
        Chatroom chatroom = chatroomService.getChatroom(mockChatroom1.getId());
        assertEquals("method getChatroom returned wrong chatroom", mockChatroom1, chatroom);
    }

    @Test
    @Transactional
    public void testFindChatroomByName() throws Exception {
        Chatroom chatroom = chatroomService.findChatroomByName("chatroom1");
        assertEquals("method findChatroomByName returned wrong chatroom", mockChatroom1, chatroom);
    }

    @Test
    @Transactional
    public void testGetMessages() throws Exception {
        Iterable<Message> messages = chatroomService.getMessages(mockChatroom1.getId());
        List<Message> answer = new ArrayList<>();
        convertPersistentBagToMessageArrayList(messages, answer);
        assertEquals("method getMessages returned wrong messages", this.messages, answer);
    }

    @Test
    @Transactional
    public void testPostMessage() throws Exception {
        chatroomService.postMessage(new MessageDTO(mockUser1, "Wow"), mockChatroom1.getId(), getDefaultDate());
        List<Message> messageList = messageRepository.findAll();
        boolean answer = false;
        for (Message message : messageList) {
            if (message.getAuthor().equals(mockUser1) && message.getContent().equals("Wow")) {
                answer = true;
            }
        }
        assertTrue("postMessage failed ", answer);
    }

    @Test
    @Transactional
    public void testGetChatroomMemberList() throws Exception {
        Iterable<User> chatroomMemberList = chatroomService.getChatroomMemberList(mockChatroom1.getId());
        List<User> answer = new ArrayList<>();
        convertPersistentBagToUserArrayList(chatroomMemberList, answer);
        assertEquals("method getChatroomMemberList returned wrong users", users, answer);

    }

    @Test
    @Transactional
    public void testCreateChatroom() throws Exception {
        Chatroom chatroomToCreate = new Chatroom("renamed chatroom");
        chatroomService.createChatroom(new ChatroomName(chatroomToCreate.getName()));
        List<Chatroom> chatroomList = chatroomRepository.findAll();
        boolean answer = false;
        for (Chatroom chatroom : chatroomList) {
            if (chatroom.getName().equals(chatroomToCreate.getName())) {
                answer = true;
            }
        }
        assertTrue("createChatroom failed ", answer);

    }

    // TODO: 11/24/2016 finishTests
   /* @Test
    @Transactional
    public void testJoinChatroom() throws Exception {
        chatroomService.joinChatroom(new ChatroomId(mockChatroom1.getId()), new UserId(mockUser3.getId()));

        User joinedUser = userRepository.findOne(mockUser3.getId());
        Chatroom chatroomToJoin = chatroomRepository.findOne(mockChatroom1.getId());

        List<User> chatroomMemberList = chatroomToJoin.getMembers();
        List<Chatroom> userChatroomList = joinedUser.getChatrooms();

        List<Chatroom> chatroomList = new ArrayList<>();
        List<User> userList = new ArrayList<>();

        convertPersistentBagToUserArrayList(chatroomMemberList, userList);
        convertPersistentBagToChatroomArrayList(userChatroomList, chatroomList);

        boolean answer1 = false;
        boolean answer2 = false;

        for (Chatroom chatroom : chatroomList) {
            if (chatroom.getName().equals(chatroomToJoin.getName())) {
                answer1 = true;
            }
        }

        for (User user : userList) {
            if (user.getLogin().equals(joinedUser.getLogin())) {
                answer2 = true;
            }
        }
        assertTrue("joinChatroomFailed failed. User is not a chatroom's member ", answer1);
        assertTrue("joinChatroomFailed failed. Chatroom is not in user's chatroom list ", answer2);
    }*/


    private void convertPersistentBagToChatroomArrayList(Iterable<Chatroom> chatroomList, List<Chatroom> answer) {
        for (Chatroom chatroom : chatroomList) {
            answer.add(chatroom);
        }
    }

    private void convertPersistentBagToMessageArrayList(Iterable<Message> messageList, List<Message> answer) {
        for (Message message : messageList) {
            answer.add(message);
        }
    }

    private void convertPersistentBagToUserArrayList(Iterable<User> userList, List<User> answer) {
        for (User user : userList) {
            answer.add(user);
        }
    }

    private Date getDefaultDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss");
        try {
            Date date = formatter.parse("11-November-2008 13:23:10");
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
