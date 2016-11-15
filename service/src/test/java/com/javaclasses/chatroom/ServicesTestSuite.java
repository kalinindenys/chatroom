package com.javaclasses.chatroom;

import com.javaclasses.chatroom.service.mockito.MockitoChatroomServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class,
        MockitoChatroomServiceTest.class
})
public class ServicesTestSuite {
}
