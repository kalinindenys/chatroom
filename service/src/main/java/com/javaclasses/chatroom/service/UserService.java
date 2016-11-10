package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.Password;

public interface UserService {

    void updateUserData(SecurityTokenDTO securityToken, UserDTO user) throws InvalidSecurityTokenException;
    void updateAvatar(SecurityTokenDTO securityToken) throws InvalidSecurityTokenException;
    void resetPassword(SecurityTokenDTO securityToken, Password oldPassword, Password newPassword, Password passwordConfirmation)
            throws InvalidSecurityTokenException, PasswordConfirmationException;

}
