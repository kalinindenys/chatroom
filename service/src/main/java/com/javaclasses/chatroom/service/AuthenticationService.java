package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

public interface AuthenticationService {

    SecurityToken login(String login, String password) throws AuthenticationException;

}
