package com.javaclasses.chatroom.service.mockDB;


import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.javaclasses.chatroom.persistence.ChatroomRepository;
import com.javaclasses.chatroom.persistence.MessageRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import static org.slf4j.LoggerFactory.getLogger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MockDBConfiguration.class})
@Transactional
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class})
public class MockDBChatroomServiceTest {
    private static final Logger LOGGER = getLogger(MockDBChatroomServiceTest.class);


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatroomRepository chatroomRepository;
    @Test
    @DatabaseSetup("/InitialData.xml")
    @ExpectedDatabase("/ResultData.xml")
    public void test() throws Exception {
        LOGGER.info(userRepository.findByLogin("login1").toString());
        System.out.println("Here");
        System.out.println(userRepository.findByLogin("login1").toString());

    }
}
