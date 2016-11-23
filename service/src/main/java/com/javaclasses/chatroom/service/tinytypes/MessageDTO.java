package com.javaclasses.chatroom.service.tinytypes;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import com.javaclasses.chatroom.persistence.entity.User;

import java.time.LocalDateTime;

public class MessageDTO {
    private User author;
    private String content;

    public MessageDTO(User author, String content) {
        this.author = author;
        this.content = content;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
