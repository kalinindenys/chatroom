package com.javaclasses.chatroom.service.DTO;

public class SecurityTokenDTO {

    private final Long id;
    private final String token;

    public SecurityTokenDTO(Long id, String token) {
        this.id = id;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return token;
    }

}
