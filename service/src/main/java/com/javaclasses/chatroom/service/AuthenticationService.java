package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;

public interface AuthenticationService {

    void signUp(Login login, Password password) throws LoginAlreadyExistsException;
    SecurityToken signIn(Login login, Password password) throws AuthenticationException;
    void signOut(SecurityToken securityToken);
    UserDTO retrieveUser(SecurityToken securityToken) throws InvalidSecurityTokenException;

}
