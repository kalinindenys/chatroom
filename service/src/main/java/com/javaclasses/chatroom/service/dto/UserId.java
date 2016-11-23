package com.javaclasses.chatroom.service.dto;

public class UserId {

    private Long userId;

    public UserId(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return String.valueOf(userId);
    }

}
