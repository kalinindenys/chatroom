package com.javaclasses.chatroom.entities;

import java.util.List;

public class Chatroom {
    private Long id;
    private String name;
    private List<Long> memberIdList;
    private List<Long> messageIds;

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
