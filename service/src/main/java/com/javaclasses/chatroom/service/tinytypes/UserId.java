package com.javaclasses.chatroom.service.tinytypes;

public class UserId {

    private int userId;

    public UserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return String.valueOf(userId);
    }

}
