package com.javaclasses.chatroom.mock;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class,
        MockitoChatroomServiceTest.class,
})
public class MockTestSuite {
}
