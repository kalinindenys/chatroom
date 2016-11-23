package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String login;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    private AvatarData avatarData;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "user_chatroom",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "chatroom_id")})
    private List<Chatroom> chatrooms;

    public User() {

    }

    public User(String login, String password, List<Chatroom> chatrooms) {
        this.login = login;
        this.password = password;
        this.chatrooms = chatrooms;
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

    public List<Chatroom> getChatrooms() {
        return chatrooms;
    }

    public void setAvatarData(AvatarData avatarData) {
        this.avatarData = avatarData;
    }

    public AvatarData getAvatarData() {
        return avatarData;
    }

    public void setChatrooms(List<Chatroom> chatrooms) {
        this.chatrooms = chatrooms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        if (!login.equals(user.login)) return false;
        if (!password.equals(user.password)) return false;
        if (avatarData != null ? !avatarData.equals(user.avatarData) : user.avatarData != null) return false;
        return chatrooms != null ? chatrooms.equals(user.chatrooms) : user.chatrooms == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "User[ id: '" + id + "' login: '" + login + "']";
    }
}
