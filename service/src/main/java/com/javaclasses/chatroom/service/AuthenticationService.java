package com.javaclasses.chatroom.service;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.security.core.AuthenticationException;

public interface AuthenticationService {

    SecurityToken login(String login, String password) throws AuthenticationException;

}
