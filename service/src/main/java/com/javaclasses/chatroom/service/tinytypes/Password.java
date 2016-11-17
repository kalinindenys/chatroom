package com.javaclasses.chatroom.service.tinytypes;

public class Password {

    private String password;

    public Password(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!(obj instanceof Password))
            return false;

        Password another = (Password) obj;
        return password.equals(another.password);
    }

    @Override
    public String toString() {
        return password;
    }
}
