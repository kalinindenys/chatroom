package com.javaclasses.chatroom.service.dto;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SignUpInfo that = (SignUpInfo) o;

        if (login != null ? !login.equals(that.login) : that.login != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        return passwordConfirmation != null ? passwordConfirmation.equals(that.passwordConfirmation) : that.passwordConfirmation == null;

    }

    @Override
    public int hashCode() {
        int result = login != null ? login.hashCode() : 0;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (passwordConfirmation != null ? passwordConfirmation.hashCode() : 0);
        return result;
    }
}
