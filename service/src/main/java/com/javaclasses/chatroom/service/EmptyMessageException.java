package com.javaclasses.chatroom.service;

public class EmptyMessageException extends Exception {
    public EmptyMessageException(String message) {
        super(message);
    }
}
