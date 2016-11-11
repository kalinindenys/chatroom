package com.javaclasses.chatroom.service.DTO;

public class SecurityTokenDTO {

    private final String token;

    public SecurityTokenDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return token;
    }

}