package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.LoginAlreadyExistsException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;



}
