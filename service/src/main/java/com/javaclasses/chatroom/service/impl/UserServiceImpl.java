package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
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
    @Autowired
    SecurityTokenRepository securityTokenRepository;

    @Override
    public void updateUserData(SecurityToken securityToken, UserDTO user) throws InvalidSecurityTokenException {
        if (!securityTokenRepository.exists(securityToken.getId())) {
            throw new InvalidSecurityTokenException();
        }

        User persistentUser = userRepository.findOne(user.getId());

        if (persistentUser == null) {
            throw new IllegalStateException();
        }

        persistentUser.setLogin(user.getLogin());
        persistentUser.setPassword(user.getPassword());

        userRepository.save(persistentUser);
    }

}
