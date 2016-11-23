package com.javaclasses.chatroom.service.tinytypes;

public class RequestError {
    private final String errorMessage;

    public RequestError(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
