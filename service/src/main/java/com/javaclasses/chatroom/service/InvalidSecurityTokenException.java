package com.javaclasses.chatroom.service;

public class InvalidSecurityTokenException extends Exception{

    public InvalidSecurityTokenException() {
        super("Invalid security token");
    }

    public InvalidSecurityTokenException(String message) {
        super(message);
    }

}
