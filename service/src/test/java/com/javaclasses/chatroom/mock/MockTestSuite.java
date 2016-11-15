package com.javaclasses.chatroom.mock;

import com.javaclasses.chatroom.mock.AuthenticationServiceMockTest;
import com.javaclasses.chatroom.mock.UserServiceMockTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class
})
public class MockTestSuite {
}
