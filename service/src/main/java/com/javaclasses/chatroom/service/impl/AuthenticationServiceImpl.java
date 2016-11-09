package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AuthenticationException;
import com.javaclasses.chatroom.service.AuthenticationService;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.LoginAlreadyExistsException;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
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
    public void signUp(Login login, Password password) throws LoginAlreadyExistsException {
        if (userRepository.findByLogin(login.getLogin()) != null) {
            throw new LoginAlreadyExistsException("User with login '" + login + "' already exists");
        }

        User user = new User(login.getLogin(), password.getPassword());
        userRepository.save(user);
    }

    @Override
    public SecurityToken signIn(Login login, Password password) throws AuthenticationException {
        User user = userRepository.findByLoginAndPassword(login.getLogin(), password.getPassword());

        if (user != null) {
            SecurityToken securityToken = generateSecurityToken(user.getId());
            securityTokenRepository.save(securityToken);
            return securityToken;
        }

        throw new AuthenticationException("Wrong credentials. Login '" + login + "', password '" + password + "'");
    }

    @Override
    public void signOut(SecurityToken securityToken) {
        securityTokenRepository.delete(securityToken.getId());
    }

    @Override
    public UserDTO retrieveUserDTO(SecurityToken securityToken) throws InvalidSecurityTokenException {
        if (!securityTokenRepository.exists(securityToken.getId())) {
            throw new InvalidSecurityTokenException();
        }

        User user = userRepository.findOne(securityToken.getUserId());
        return new UserDTO(user.getId(), user.getLogin(), user.getPassword());
    }

    private SecurityToken generateSecurityToken(Long userId) {
        int tokenLength = 32;
        SecureRandom secureRandom = new SecureRandom();
        return new SecurityToken(new BigInteger(130, secureRandom).toString(tokenLength), userId, LocalDateTime.now().plusHours(1));
    }

}
