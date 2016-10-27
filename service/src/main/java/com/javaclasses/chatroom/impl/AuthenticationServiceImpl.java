package com.javaclasses.chatroom.impl;

import com.javaclasses.chatroom.AuthenticationException;
import com.javaclasses.chatroom.AuthenticationService;
import com.javaclasses.chatroom.UserRepository;
import com.javaclasses.chatroom.entity.SecurityToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigInteger;
import java.security.SecureRandom;

public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    private UserRepository userRepository;

    @Override
    public SecurityToken login(String login, String password) throws AuthenticationException {
        if (userRepository.findByLoginAndPassword(login, password) == null) {
            throw new AuthenticationException("Wrong login or password");
        }

        SecurityToken securityToken = generateSecuritToken();

        return securityToken;
    }

    private SecurityToken generateSecuritToken() {
        int tokenLength = 32;
        SecureRandom secureRandom = new SecureRandom();
        return new SecurityToken(new BigInteger(130, secureRandom).toString(tokenLength));
    }

}
