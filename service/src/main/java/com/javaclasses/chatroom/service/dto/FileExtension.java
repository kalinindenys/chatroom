package com.javaclasses.chatroom.service.dto;

public class FileExtension {

    private final String fileExtension;

    public FileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FileExtension that = (FileExtension) o;

        return fileExtension != null ? fileExtension.equals(that.fileExtension) : that.fileExtension == null;

    }

    @Override
    public int hashCode() {
        return fileExtension != null ? fileExtension.hashCode() : 0;
    }

    @Override
    public String toString() {
        return fileExtension;
    }
}
