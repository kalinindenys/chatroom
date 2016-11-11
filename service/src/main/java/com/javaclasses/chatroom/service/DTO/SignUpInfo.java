package com.javaclasses.chatroom.service.DTO;

public class SignUpInfo {

    private String login;
    private String password;
    private String passwordConfirmation;

    public SignUpInfo() {
    }

    public SignUpInfo(String login, String password, String passwordConfirmation) {
        this.login = login;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
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

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }
}
