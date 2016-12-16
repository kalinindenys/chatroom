package com.javaclasses.chatroom.DBUnit;


import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.dto.ChatroomName;
import com.javaclasses.chatroom.service.dto.MessageDTO;
import com.javaclasses.chatroom.service.EmptyMessageException;
import com.javaclasses.chatroom.DBUnit.config.MockDBConfiguration;
import com.javaclasses.chatroom.service.dto.ChatroomId;
import com.javaclasses.chatroom.service.dto.UserId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MockDBConfiguration.class})
@WebAppConfiguration
@Transactional
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class})
public class DBUnitChatroomServiceTest {
    private static final Logger LOGGER = getLogger(DBUnitChatroomServiceTest.class);


    @Autowired
    private ChatroomService chatroomService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatroomRepository chatroomRepository;

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void getChatroomList() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getUserChatroomList(1L);
        LOGGER.info(chatroomList.toString());

    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void getChatroom() throws Exception {
        Chatroom chatroom = chatroomService.getChatroom(24L);
        LOGGER.info(chatroom.toString());

    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void getMessages() throws Exception {
        Iterable<Message> messages = chatroomService.getMessages(20L);
        // TODO: 11/16/2016 check date
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void getChatroomMemberList() throws Exception {
        Iterable<User> chatroomMemberList = chatroomService.getChatroomMemberList(20L);
        LOGGER.info(chatroomMemberList.toString());

    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/PostMessageResultData.xml")
    public void postMessage() throws Exception {


        chatroomService.postMessage(new MessageDTO(userRepository.findOne(0L), "Added message from test"), 20L, setDefaultDate());


    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void postNullMessage() throws Exception {
        try {
            chatroomService.postMessage(null, null, null);
            assert false;
        } catch (NullPointerException npe) {
            LOGGER.info("NullPointerException has been caught");
        }
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void postEmptyMessage() throws Exception {
        try {
            chatroomService.postMessage(new MessageDTO(userRepository.findOne(2L), null), 20L, setDefaultDate());
        } catch (EmptyMessageException eme) {
            LOGGER.info("EmptyMessageException has been caught");
        }
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void getAllChatroomsTest() throws Exception {
        Iterable<Chatroom> allChatrooms = chatroomService.getAllChatrooms();
        LOGGER.info(allChatrooms.toString());
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void findChatroomTest() throws Exception {
        Chatroom chatroom = chatroomService.findChatroomByName("chatroom20");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomByName("chatroom21");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomByName("chatroom25");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomByName("chatroom");
        LOGGER.info("findChatroomTest:  by 'chatroom'" + chatroom.toString());

    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/CreateChatroomResultData.xml")
    public void createChatroom() throws Exception {
        chatroomService.createChatroom(new ChatroomName("created Chatroom"));
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/JoinChatroomResultData.xml")
    public void joinChatroom() throws Exception {
        chatroomService.joinChatroom(new ChatroomId(27L), new UserId(9L));
        LOGGER.info(userRepository.findOne(9L).getChatrooms().toString());
        LOGGER.info(chatroomRepository.findOne(27L).getMembers().toString());
    }

    @Test
    @DatabaseSetup("/DBUnit/JoinChatroomResultData.xml")
    @ExpectedDatabase("/DBUnit/InitialData.xml")
    public void leaveChatroom() throws Exception {
        chatroomService.leaveChatroom(new ChatroomId(27L), new UserId(9L));
        LOGGER.info(userRepository.findOne(9L).getChatrooms().toString());
        LOGGER.info(chatroomRepository.findOne(27L).getMembers().toString());
    }

    @Test
    @DatabaseSetup("/DBUnit/InitialData.xml")
    @ExpectedDatabase("/DBUnit/RenameChatroomTest.xml")
    public void renameChatroom() throws Exception {
        chatroomService.renameChatroom(new ChatroomId(27L), new ChatroomName("Renamed Chatroom 27"));
        LOGGER.info(chatroomRepository.findOne(27L).toString());
        LOGGER.info(userRepository.findOne(4L).getChatrooms().toString());
    }


    private Date setDefaultDate() {
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
