package com.javaclasses.chatroom.service.DTO;

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
}
