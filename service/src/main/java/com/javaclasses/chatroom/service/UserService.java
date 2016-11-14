package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import com.javaclasses.chatroom.service.tinytypes.Password;

import java.io.InputStream;

public interface UserService {

    void updateUserData(SecurityTokenDTO securityToken, UserDTO user) throws InvalidSecurityTokenException;
    void updateAvatar(SecurityTokenDTO securityToken, InputStream avatarData, FileExtension fileExtension) throws InvalidSecurityTokenException, AvatarSaveException;
    void resetPassword(SecurityTokenDTO securityToken, Password oldPassword, Password newPassword, Password passwordConfirmation)
            throws InvalidSecurityTokenException, PasswordConfirmationException;

}
