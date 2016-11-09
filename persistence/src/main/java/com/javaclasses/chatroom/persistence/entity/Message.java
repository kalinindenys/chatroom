package com.javaclasses.chatroom.persistence.entity;

import com.sun.istack.internal.NotNull;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private User author;
    private Long chatroomId;
    private String content;
    private LocalDateTime date;

    public Message(Long id, User author, Long chatroomId, String content, LocalDateTime date) {
        this.id = id;
        this.author = author;
        this.chatroomId = chatroomId;
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

    public Long getChatroomId() {
        return chatroomId;
    }

    public void setChatroomId(Long chatroomId) {
        this.chatroomId = chatroomId;
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
