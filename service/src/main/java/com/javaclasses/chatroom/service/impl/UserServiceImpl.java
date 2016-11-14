package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AvatarSaveException;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.PasswordConfirmationException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import javax.sql.rowset.serial.SerialBlob;
import java.io.*;
import java.sql.Blob;

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
    public void updateAvatar(SecurityTokenDTO securityToken, InputStream avatarData, FileExtension fileExtension) throws InvalidSecurityTokenException, AvatarSaveException {
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

            throw new AvatarSaveException("Can not save avatar in storage");
        }

        userRepository.save(user);
    }

    @Override
    @Transactional
    public void resetPassword(SecurityTokenDTO securityToken, Password oldPassword, Password newPassword, Password passwordConfirmation)
            throws InvalidSecurityTokenException, PasswordConfirmationException {

    }

}
