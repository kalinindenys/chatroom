package com.javaclasses.chatroom.persistence.entity;

public enum AvatarContentType {

    PNG("image/png"),
    JPEG("image/jpeg"),
    BMP("image/bmp"),
    GIF("image/gif");

    private String contentType;

    AvatarContentType(String contentType) {
        this.contentType = contentType;
    }
}
