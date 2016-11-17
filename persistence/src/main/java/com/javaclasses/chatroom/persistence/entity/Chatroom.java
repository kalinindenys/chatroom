package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chatroomList")
    private List<User> members = new ArrayList<>();

    @OneToMany(mappedBy = "chatroom")
    private List<Message> messages;

    public Chatroom() {
    }

    public Chatroom(String name) {
        this.name = name;
    }

    public Chatroom(String name, List<User> members, List<Message> messages) {
        this.name = name;
        this.members = members;
        this.messages = messages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public void addMember(User user) {
        members.add(user);
    }

    @Override
    public String toString() {
        return "Chatroom[ id: '" + id + "' name: '" + name + "']";
    }
}
