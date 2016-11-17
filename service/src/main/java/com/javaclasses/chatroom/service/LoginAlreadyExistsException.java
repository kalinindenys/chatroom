package com.javaclasses.chatroom.service;

public class LoginAlreadyExistsException extends Exception {

    public LoginAlreadyExistsException() {

    }

    public LoginAlreadyExistsException(String message) {
        super(message);
    }

}
