package com.javaclasses.chatroom.services.DTO;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.User;

import java.time.LocalDateTime;

public class MessageDTO {
    private Long id;
    private User Author;
    private Chatroom chatroom;
    private String content;
    private LocalDateTime date;

    public MessageDTO(Long id, User author, Chatroom chatroom, String content, LocalDateTime date) {
        this.id = id;
        Author = author;
        this.chatroom = chatroom;
        this.content = content;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return Author;
    }

    public void setAuthor(User author) {
        Author = author;
    }

    public Chatroom getChatroom() {
        return chatroom;
    }

    public void setChatroom(Chatroom chatroom) {
        this.chatroom = chatroom;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
