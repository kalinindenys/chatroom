package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.*;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityTokenRepository securityTokenRepository;


    @Override
    public void signUp(Login login, Password password, Password passwordConfirmation) throws LoginAlreadyExistsException, PasswordConfirmationException {
        if (userRepository.findByLogin(login.getLogin()) != null) {
            throw new LoginAlreadyExistsException("User with login '" + login + "' already exists");
        }
        if (!password.equals(passwordConfirmation)) {
            throw new PasswordConfirmationException("Password and password confirmation do not match");
        }

        User user = new User(login.getLogin(), hashPassword(password.getPassword()));
        userRepository.save(user);
    }

    @Override
    public SecurityTokenDTO signIn(Login login, Password password) throws AuthenticationException {
        final User user = userRepository.findByLoginAndPassword(login.getLogin(), hashPassword(password.getPassword()));

        if (user == null) {
            throw new AuthenticationException("Wrong credentials. Login '" + login + "', password '" + password + "'");
        }

        final String token = generateSecurityToken();
        final SecurityToken securityToken = new SecurityToken(token, user, LocalDateTime.now().plusHours(1));
        securityTokenRepository.save(securityToken);

        return new SecurityTokenDTO(token);
    }

    @Override
    public void signOut(SecurityTokenDTO securityToken) {
        final SecurityToken persistentToken = securityTokenRepository.findByToken(securityToken.getToken());

        if (persistentToken != null) {
            securityTokenRepository.delete(persistentToken.getId());
        }
    }

    @Override
    public UserDTO retrieveUser(SecurityTokenDTO securityToken) throws InvalidSecurityTokenException {
        final SecurityToken persistentToken = securityTokenRepository.findByToken(securityToken.getToken());

        if (persistentToken == null) {
            throw new InvalidSecurityTokenException();
        }

        final User user = persistentToken.getUser();
        return new UserDTO(user.getId(), user.getLogin(), user.getPassword());
    }

    private String generateSecurityToken() {
        int tokenLength = 32;
        SecureRandom secureRandom = new SecureRandom();
        return new BigInteger(130, secureRandom).toString(tokenLength);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());

            StringBuilder stringBuilder = new StringBuilder();
            for (byte bytes : messageDigest) {
                stringBuilder.append(String.format("%02x", bytes & 0xff));
            }

            return stringBuilder.toString();

        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException(ex.getMessage());
        }
    }

}
