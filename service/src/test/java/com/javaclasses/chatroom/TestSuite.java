package com.javaclasses.chatroom;

import com.javaclasses.chatroom.hsqlmem.InMemoryTestSuite;
import com.javaclasses.chatroom.mock.MockTestSuite;
import com.javaclasses.chatroom.DBUnit.DBUnitChatroomServiceTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        MockTestSuite.class,
        InMemoryTestSuite.class,
        DBUnitChatroomServiceTest.class
})
public class TestSuite {
}
