package com.javaclasses.chatroom.service.DTO;

public class UserDTO {
    private Long id;
    private String login;
    private String avatarURL;

    public UserDTO(Long id, String login, String avatarURL) {
        this.id = id;
        this.login = login;
        this.avatarURL = avatarURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }
}
