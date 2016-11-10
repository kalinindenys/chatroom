package com.javaclasses.chatroom.persistence.entity;

import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private User author;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chatroom_id")
    private Chatroom chatroom;
    private String content;
    private LocalDateTime date;

    public Message(Long id, User author, Chatroom chatroomId, String content, LocalDateTime date) {
        this.id = id;
        this.author = author;
        this.chatroom = chatroomId;
        this.content = content;
        this.date = date;
    }

    public Message() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "Message[ id: '" + id + "' author: '" + author + "' content: '" + content + "' date: '" + date + "']";
    }
}