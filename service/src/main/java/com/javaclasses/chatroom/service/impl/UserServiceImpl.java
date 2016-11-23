package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AvatarNotFoundException;
import com.javaclasses.chatroom.service.AvatarNotUpdatedException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.dto.FileExtension;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.dto.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public void updateUserData(UserDTO user) {
        User persistentUser = userRepository.findOne(user.getId());

        if (persistentUser == null) {
            throw new IllegalStateException();
        }

        persistentUser.setLogin(user.getLogin());

        userRepository.save(persistentUser);
    }

    @Override
    @Transactional
    public void updateAvatar(UserId userId, InputStream avatarData, FileExtension fileExtension) throws AvatarNotUpdatedException {
        final User user = userRepository.findOne(userId.getUserId());
        try {
            user.setAvatarData(new AvatarData(StreamUtils.copyToByteArray(avatarData), fileExtension.getFileExtension()));
        } catch (IOException e) {
            if (LOG.isErrorEnabled()) {
                LOG.error(e.getMessage());
            }

            throw new AvatarNotUpdatedException("Can not save avatar in storage");
        }

        userRepository.save(user);
    }

    @Override
    public AvatarData receiveAvatar(UserId userId) throws AvatarNotFoundException {
        AvatarData avatarData = userRepository.findOne(userId.getUserId()).getAvatarData();

        if (avatarData == null) {
            throw new AvatarNotFoundException("User have no avatar");
        } else {
            return avatarData;
        }
    }

}
