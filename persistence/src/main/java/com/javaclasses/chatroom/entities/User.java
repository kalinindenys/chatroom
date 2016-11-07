package com.javaclasses.chatroom.entities;

import org.springframework.data.annotation.Id;

import javax.annotation.Generated;
import java.util.List;

public class User {
    @Id
    private Long id;
    private String login;
    private String password;
    private List<Long> chatroomIdList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getChatroomIdList() {
        return chatroomIdList;
    }

    public void setChatroomIdList(List<Long> chatroomIdList) {
        this.chatroomIdList = chatroomIdList;
    }
}
