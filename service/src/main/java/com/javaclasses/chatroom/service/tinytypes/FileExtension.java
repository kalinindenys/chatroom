package com.javaclasses.chatroom.service.tinytypes;

public class FileExtension {

    private final String fileExtension;

    public FileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    @Override
    public String toString() {
        return fileExtension;
    }
}
