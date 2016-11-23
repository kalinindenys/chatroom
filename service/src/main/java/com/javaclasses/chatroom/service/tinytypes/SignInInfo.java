package com.javaclasses.chatroom.service.tinytypes;

public class SignInInfo {

    private String login;
    private String password;

    public SignInInfo() {

    }

    public SignInInfo(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "SignInInfo{" +
                "login='" + login + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
