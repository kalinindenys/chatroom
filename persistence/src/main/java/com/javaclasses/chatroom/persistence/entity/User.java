package com.javaclasses.chatroom.persistence.entity;

import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id")
    private List<Chatroom> chatroomList;

    public User(Long id, String login, String password, List<Chatroom> chatroomIdList) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.chatroomList = chatroomIdList;
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

    public List<Chatroom> getChatroomList() {
        return chatroomList;
    }

    public void setChatroomList(List<Chatroom> chatroomList) {
        this.chatroomList = chatroomList;
    }

    @Override
    public String toString() {
        return "User[ id: '" + id + "' login: '" + login + "']";
    }
}
