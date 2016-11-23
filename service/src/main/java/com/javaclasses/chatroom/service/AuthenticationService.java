package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.service.dto.Login;
import com.javaclasses.chatroom.service.dto.Password;
import com.javaclasses.chatroom.service.dto.SecurityTokenDTO;
import com.javaclasses.chatroom.service.dto.UserDTO;

public interface AuthenticationService {

    /**
     * Constructs a new {@code User} with specified {@code login} and {@code password}.
     * Then save it to user repository.
     *
     * @param login the login of user to be signed up.
     * @param password the password of user to be signed up.
     * @param passwordConfirmation the password confirmation.
     * @throws LoginAlreadyExistsException if the {@code login} already exists in user repository.
     * @throws PasswordConfirmationException if the {@code password} and {@code passwordConfirmation} do not match.
     */
    void signUp(Login login, Password password, Password passwordConfirmation) throws LoginAlreadyExistsException, PasswordConfirmationException;

    SecurityTokenDTO signIn(Login login, Password password) throws AuthenticationException;

    void signOut(SecurityTokenDTO securityToken);

    UserDTO retrieveUser(SecurityTokenDTO securityToken) throws InvalidSecurityTokenException;

}
