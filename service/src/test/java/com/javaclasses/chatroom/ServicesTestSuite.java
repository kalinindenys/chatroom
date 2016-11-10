package com.javaclasses.chatroom;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceMockTest.class,
        UserServiceMockTest.class
})
public class ServicesTestSuite {
}
