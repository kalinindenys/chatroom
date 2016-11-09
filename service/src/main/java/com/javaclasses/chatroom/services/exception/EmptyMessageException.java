package com.javaclasses.chatroom.services.exception;

public class EmptyMessageException extends Exception {
    public EmptyMessageException(String message) {
        super(message);
    }
}
