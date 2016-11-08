package com.javaclasses.chatroom.persistence.entities;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String password;
    private List<Long> chatroomIdList;

    public User(Long id, String login, String password, List<Long> chatroomIdList) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.chatroomIdList = chatroomIdList;
    }

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
