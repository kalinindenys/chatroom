package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.service.dto.SecurityTokenDTO;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;

public interface AuthenticationService {

    void signUp(Login login, Password password, Password passwordConfirmation) throws LoginAlreadyExistsException, PasswordConfirmationException;

    SecurityTokenDTO signIn(Login login, Password password) throws AuthenticationException;

    void signOut(SecurityTokenDTO securityToken);

    UserDTO retrieveUser(SecurityTokenDTO securityToken) throws InvalidSecurityTokenException;

}
