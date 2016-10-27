package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entity.SecurityToken;

public interface AuthenticationService {

    SecurityToken login(String login, String password) throws AuthenticationException;

}
