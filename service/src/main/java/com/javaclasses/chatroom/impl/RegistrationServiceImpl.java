package com.javaclasses.chatroom.impl;

import com.javaclasses.chatroom.RegistrationService;
import com.javaclasses.chatroom.UserRepository;
import com.javaclasses.chatroom.entities.User;
import org.springframework.stereotype.Service;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private UserRepository userRepository;

    @Override
    public void registerUser(User user) {
        userRepository.save(user);
    }
}
