package com.javaclasses.chatroom.service;

public class AvatarNotFoundException extends Exception {

    public AvatarNotFoundException() {
    }

    public AvatarNotFoundException(String message) {
        super(message);
    }

}
