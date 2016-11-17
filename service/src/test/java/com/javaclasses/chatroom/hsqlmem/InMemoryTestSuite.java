package com.javaclasses.chatroom.hsqlmem;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        AuthenticationServiceInMemoryTest.class,
        UserServiceInMemoryTest.class
})
public class InMemoryTestSuite {
}
