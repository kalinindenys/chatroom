package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.PasswordConfirmationException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    SecurityTokenRepository securityTokenRepository;

    @Override
    public void updateUserData(SecurityTokenDTO securityToken, UserDTO user) throws InvalidSecurityTokenException {
        if (securityTokenRepository.findByToken(securityToken.getToken()) == null) {
            throw new InvalidSecurityTokenException();
        }

        User persistentUser = userRepository.findOne(user.getId());

        if (persistentUser == null) {
            throw new IllegalStateException();
        }

        persistentUser.setLogin(user.getLogin());

        userRepository.save(persistentUser);
    }

    @Override
    public void updateAvatar(SecurityTokenDTO securityToken, byte[] avatar) throws InvalidSecurityTokenException {
        final SecurityToken persistentToken = securityTokenRepository.findByToken(securityToken.getToken());

        if (persistentToken == null) {
            throw new InvalidSecurityTokenException();
        }

        final User user = persistentToken.getUser();
        user.setAvatar(avatar);

        userRepository.save(user);
    }

    @Override
    public void resetPassword(SecurityTokenDTO securityToken, Password oldPassword, Password newPassword, Password passwordConfirmation)
            throws InvalidSecurityTokenException, PasswordConfirmationException {

    }
}
