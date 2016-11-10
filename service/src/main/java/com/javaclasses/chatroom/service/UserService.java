package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.DTO.UserDTO;

public interface UserService {

    void updateUserData(SecurityToken securityToken, UserDTO user) throws InvalidSecurityTokenException;

}
