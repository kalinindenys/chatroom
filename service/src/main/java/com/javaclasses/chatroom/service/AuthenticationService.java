package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.service.dto.Login;
import com.javaclasses.chatroom.service.dto.Password;
import com.javaclasses.chatroom.service.dto.SecurityTokenDTO;
import com.javaclasses.chatroom.service.dto.UserDTO;

public interface AuthenticationService {

    void signUp(Login login, Password password, Password passwordConfirmation) throws LoginAlreadyExistsException, PasswordConfirmationException;
    SecurityTokenDTO signIn(Login login, Password password) throws AuthenticationException;
    void signOut(SecurityTokenDTO securityToken);
    UserDTO retrieveUser(SecurityTokenDTO securityToken) throws InvalidSecurityTokenException;

}
