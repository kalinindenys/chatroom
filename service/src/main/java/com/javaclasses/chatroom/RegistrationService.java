package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entities.User;

public class RegistrationService {
    UserRepository userRepository = new UserRepositoryImpl();

    public void registrate(User user) {
//// TODO: 10/27/2016 check Exceptions;
        userRepository.addUser(user);
    }
}
