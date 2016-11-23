package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;

@Entity
public class AvatarData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "BLOB")
    private byte[] avatar;
    private AvatarContentType contentType;

    public AvatarData() {
    }

    public AvatarData(byte[] avatar, AvatarContentType contentType) {
        this.avatar = avatar;
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public AvatarContentType getContentType() {
        return contentType;
    }

    public void setContentType(AvatarContentType contentType) {
        this.contentType = contentType;
    }
}
