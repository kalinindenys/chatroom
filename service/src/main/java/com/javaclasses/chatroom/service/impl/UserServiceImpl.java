package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.*;
import com.javaclasses.chatroom.service.dto.SecurityTokenDTO;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import com.javaclasses.chatroom.service.tinytypes.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.*;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserRepository userRepository;
    @Autowired
    SecurityTokenRepository securityTokenRepository;

    @Override
    @Transactional
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
    @Transactional
    public void updateAvatar(SecurityTokenDTO securityToken, InputStream avatarData, FileExtension fileExtension) throws InvalidSecurityTokenException, AvatarNotUpdatedException {
        final SecurityToken persistentToken = securityTokenRepository.findByToken(securityToken.getToken());

        if (persistentToken == null) {
            throw new InvalidSecurityTokenException();
        }

        final User user = persistentToken.getUser();
        try {
            user.setAvatarData(new AvatarData(StreamUtils.copyToByteArray(avatarData), fileExtension.getFileExtension()));
        } catch (IOException e) {
            if (LOG.isErrorEnabled())
            {
                LOG.error(e.getMessage());
            }

            throw new AvatarNotUpdatedException("Can not save avatar in storage");
        }

        userRepository.save(user);
    }

    @Override
    public AvatarData receiveAvatar(SecurityTokenDTO securityToken, UserId userId) throws InvalidSecurityTokenException, AvatarNotFoundException {
        if (securityTokenRepository.findByToken(securityToken.getToken()) == null) {
            throw new InvalidSecurityTokenException();
        }

        AvatarData avatarData = userRepository.findOne(userId.getUserId()).getAvatarData();

        if (avatarData == null) {
            throw new AvatarNotFoundException("User have no avatar");
        } else {
            return avatarData;
        }
    }

}
