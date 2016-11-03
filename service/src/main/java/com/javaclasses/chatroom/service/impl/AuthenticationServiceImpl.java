package com.javaclasses.chatroom.service.impl;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.time.LocalDateTime;

public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Override
    public SecurityToken login(String login, String password) throws AuthenticationException {
        User user = userRepository.findByLoginAndPassword(login, password);

        if (user != null) {
            SecurityToken securityToken = generateSecuritToken(user.getId());
            securityTokenRepository.save(securityToken);
            return securityToken;
        }

//        throw new AuthenticationException("Wrong login or password");
        throw new IllegalStateException();
    }

    private SecurityToken generateSecuritToken(Long userId) {
        int tokenLength = 32;
        SecureRandom secureRandom = new SecureRandom();
        return new SecurityToken(new BigInteger(130, secureRandom).toString(tokenLength), userId, LocalDateTime.now());
    }

}
