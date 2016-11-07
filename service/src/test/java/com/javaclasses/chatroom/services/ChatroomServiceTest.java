package com.javaclasses.chatroom.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ChatroomServiceTest {
    @Mock
    DataSource mockDataSource;
    @Mock
    Connection mockConn;
    @Mock
    PreparedStatement mockPreparedStmnt;
    @Mock
    ResultSet mockResultSet;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void getChatroomList() throws Exception {

    }

    @Test
    public void getChatroom() throws Exception {

    }

    @Test
    public void getMessages() throws Exception {

    }

    @Test
    public void getChatroomMemberList() throws Exception {

    }

    @Test
    public void postMessage() throws Exception {

    }

}