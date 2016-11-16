package com.javaclasses.chatroom.service.mockDB;


import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.Message;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.ChatroomService;
import com.javaclasses.chatroom.service.DTO.MessageDTO;
import com.javaclasses.chatroom.service.EmptyMessageException;
import com.javaclasses.chatroom.service.mockDB.config.MockDBConfiguration;
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

import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MockDBConfiguration.class})
@WebAppConfiguration
@Transactional
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class})
public class MockDBChatroomServiceTest {
    private static final Logger LOGGER = getLogger(MockDBChatroomServiceTest.class);


    @Autowired
    private ChatroomService chatroomService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatroomRepository chatroomRepository;

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/InitialData.xml")
    public void test() throws Exception {
        LOGGER.info(userRepository.findByLogin("login1").toString());
    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/InitialData.xml")
    public void getChatroomList() throws Exception {
        Iterable<Chatroom> chatroomList = chatroomService.getChatroomList(1L);
        LOGGER.info(chatroomList.toString());

    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/InitialData.xml")
    public void getChatroom() throws Exception {
        Chatroom chatroom = chatroomService.getChatroom(24L);
        LOGGER.info(chatroom.toString());

    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/InitialData.xml")
    public void getMessages() throws Exception {
        Iterable<Message> messages = chatroomService.getMessages(20L);
        LOGGER.info(messages.toString());
        // TODO: 11/16/2016 check date
    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/InitialData.xml")
    public void getChatroomMemberList() throws Exception {
        Iterable<User> chatroomMemberList = chatroomService.getChatroomMemberList(20L);
        LOGGER.info(chatroomMemberList.toString());

    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/PostMessageResultData.xml")
    public void postMessage() throws Exception {
        chatroomService.postMessage(new MessageDTO(userRepository.findOne(0L), "Added message from test"), 20L);

    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @DatabaseSetup("/InitialData.xml")
    public void postNullMessage() throws Exception {
        try {
            chatroomService.postMessage(null, null);
            assert false;
        } catch (NullPointerException npe) {
            LOGGER.info("NullPointerException has been caught");
        }
    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @DatabaseSetup("/InitialData.xml")
    public void postEmptyMessage() throws Exception {
        try {
            chatroomService.postMessage(new MessageDTO(userRepository.findOne(2L), null), 20L);
        } catch (EmptyMessageException eme) {
            LOGGER.info("EmptyMessageException has been caught");
        }
    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @DatabaseSetup("/InitialData.xml")
    public void getAllChatroomsTest() throws Exception {
        Iterable<Chatroom> allChatrooms = chatroomService.getAllChatrooms();
        LOGGER.info(allChatrooms.toString());
    }

    @Test
    @DatabaseSetup("/InitialData.xml")
    @DatabaseSetup("/InitialData.xml")
    public void findChatroomTest() throws Exception {
        Iterable<Chatroom> chatroom = chatroomService.findChatroomsByName("chatroom20");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomsByName("chatroom21");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomsByName("chatroom25");
        LOGGER.info("findChatroomTest: " + chatroom.toString());
        chatroom = chatroomService.findChatroomsByName("chatroom");
        LOGGER.info("findChatroomTest:  by 'chatroom'" + chatroom.toString());

    }
}
