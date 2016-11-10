package com.javaclasses.chatroom.service;

public class InvalidSecurityTokenException extends Exception{

    public InvalidSecurityTokenException() {
    }

    public InvalidSecurityTokenException(String message) {
        super(message);
    }

}
