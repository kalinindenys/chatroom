package com.javaclasses.chatroom;

import com.javaclasses.chatroom.DBUnit.DBUnitChatroomServiceTest;
import com.javaclasses.chatroom.hsqlmem.InMemoryChatroomServiceTest;
import com.javaclasses.chatroom.hsqlmem.InMemoryTestSuite;
import com.javaclasses.chatroom.mock.MockTestSuite;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)

@Suite.SuiteClasses({
        MockTestSuite.class,
        InMemoryTestSuite.class,
        DBUnitChatroomServiceTest.class,
        InMemoryChatroomServiceTest.class
})
public class TestSuite {
}
