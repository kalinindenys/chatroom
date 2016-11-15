package com.javaclasses.chatroom.persistence.entity;

import javax.persistence.*;
import java.io.InputStream;
import java.sql.Blob;

@Entity
public class AvatarData {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] avatar;
    private String fileExtension;

    public AvatarData() {
    }

    public AvatarData(byte[] avatar, String fileExtension) {
        this.avatar = avatar;
        this.fileExtension = fileExtension;
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

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }
}
