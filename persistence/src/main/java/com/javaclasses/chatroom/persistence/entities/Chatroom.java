package com.javaclasses.chatroom.persistence.entities;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;

@Entity
public class Chatroom {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private List<Long> memberIdList;
    private List<Long> messageIds;

    public Chatroom(Long id, String name, List<Long> memberIdList, List<Long> messageIds) {
        this.id = id;
        this.name = name;
        this.memberIdList = memberIdList;
        this.messageIds = messageIds;
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

    public List<Long> getMessageIds() {
        return messageIds;
    }

    public void setMessageIds(List<Long> messageIds) {
        this.messageIds = messageIds;
    }

    public List<Long> getMemberIdList() {
        return memberIdList;
    }

    public void setMemberIdList(List<Long> memberIdList) {
        this.memberIdList = memberIdList;
    }
}
