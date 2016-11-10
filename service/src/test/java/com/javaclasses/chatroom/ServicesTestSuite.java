package com.javaclasses.chatroom;

import com.javaclasses.chatroom.service.ChatroomServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class,
        ChatroomServiceTest.class
})
public class ServicesTestSuite {
}
