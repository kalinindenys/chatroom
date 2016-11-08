package com.javaclasses.chatroom;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AuthenticationService;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.LoginAlreadyExistsException;
import com.javaclasses.chatroom.service.impl.AuthenticationServiceImpl;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;

@RunWith(SpringJUnit4ClassRunner.class)
@ComponentScan({"com.javaclasses.chatroom"})
public class AuthenticationServiceH2Test {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();



}
