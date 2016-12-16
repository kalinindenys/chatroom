package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.AvatarContentType;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.service.dto.FileExtension;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.dto.UserId;

import java.io.InputStream;

public interface UserService {

    void updateUserData(UserDTO user);

    void updateAvatar(UserId userId, InputStream avatarData, AvatarContentType contentType) throws AvatarNotUpdatedException;

    AvatarData receiveAvatar(UserId userId) throws AvatarNotFoundException;

}
