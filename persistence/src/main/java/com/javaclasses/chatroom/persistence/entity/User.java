package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String login;
    private String password;
    private byte[] avatar;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="user_chatroom",
            joinColumns={@JoinColumn(name="user_id")},
            inverseJoinColumns={@JoinColumn(name="chatroom_id")})
    private List<Chatroom> chatroomList;

    public User() {

    }

    public User(String login, String password, List<Chatroom> chatroomIdList) {
        this.login = login;
        this.password = password;
        this.chatroomList = chatroomIdList;
    }
    public User(String login, String password) {
        this.login = login;
        this.password = password;
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
    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public void setChatroomList(List<Chatroom> chatroomList) {
        this.chatroomList = chatroomList;
    }

    @Override
    public String toString() {
        return "User[ id: '" + id + "' login: '" + login + "']";
    }
}
