package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Blob;

@Entity
public class AvatarData {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private Blob avatar;
    private String fileExtension;

    public AvatarData() {
    }

    public AvatarData(Blob avatar, String fileExtension) {
        this.avatar = avatar;
        this.fileExtension = fileExtension;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blob getAvatar() {
        return avatar;
    }

    public void setAvatar(Blob avatar) {
        this.avatar = avatar;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }
}
