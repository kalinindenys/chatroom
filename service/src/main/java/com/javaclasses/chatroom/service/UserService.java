package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.service.dto.SecurityTokenDTO;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.dto.FileExtension;
import com.javaclasses.chatroom.service.dto.UserId;

import java.io.InputStream;

public interface UserService {

    void updateUserData(SecurityTokenDTO securityToken, UserDTO user) throws InvalidSecurityTokenException;
    void updateAvatar(SecurityTokenDTO securityToken, InputStream avatarData, FileExtension fileExtension) throws InvalidSecurityTokenException, AvatarNotUpdatedException;
    AvatarData receiveAvatar(SecurityTokenDTO securityToken, UserId userId) throws InvalidSecurityTokenException, AvatarNotFoundException;

}
