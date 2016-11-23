package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chatrooms")
    private List<User> members;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Chatroom chatroom = (Chatroom) o;

        if (id != null ? !id.equals(chatroom.id) : chatroom.id != null) return false;
        if (!name.equals(chatroom.name)) return false;
        if (members != null ? !members.equals(chatroom.members) : chatroom.members != null) return false;
        return messages != null ? messages.equals(chatroom.messages) : chatroom.messages == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Chatroom[ id: '" + id + "' name: '" + name + "']";
    }
}
