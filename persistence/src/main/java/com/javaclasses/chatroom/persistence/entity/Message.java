package com.javaclasses.chatroom.persistence.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class,cascade = CascadeType.ALL)
    private User author;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="chatroom_id")
    private Chatroom chatroom;

    private String content;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm a z")
    private Date date;

    public Message(User author, Chatroom chatroom, String content, Date date) {
        this.author = author;
        this.chatroom = chatroom;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Message message = (Message) o;

        if (id != null ? !id.equals(message.id) : message.id != null) return false;
        if (!author.equals(message.author)) return false;
        if (!chatroom.equals(message.chatroom)) return false;
        if (!content.equals(message.content)) return false;
        return date.equals(message.date);

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Message[ id: '" + id + "' author: '" + author + "' content: '" + content + "' date: '" + date + "']";
    }
}
