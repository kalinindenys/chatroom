package com.javaclasses.chatroom;

import com.javaclasses.chatroom.service.mockDB.MockDBChatroomServiceTest;
import com.javaclasses.chatroom.service.mockito.MockitoChatroomServiceTest;
import com.javaclasses.chatroom.mock.AuthenticationServiceMockTest;
import com.javaclasses.chatroom.mock.UserServiceMockTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class,
        MockitoChatroomServiceTest.class,
        MockDBChatroomServiceTest.class
})
public class ServicesTestSuite {
}
