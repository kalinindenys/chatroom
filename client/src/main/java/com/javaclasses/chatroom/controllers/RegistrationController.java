package com.javaclasses.chatroom.controllers;

import com.javaclasses.chatroom.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/")
public class RegistrationController {

    @PostMapping("/signUp")
    @ResponseBody
    public String registrateUser(@RequestParam("login") String login, @RequestParam("password") String password) throws Exception {
        System.out.println("Login: " + login);
        System.out.println("Password: " + password);
        validateRegistrationData(login, password);
        return login;
    }

    public void validateRegistrationData(String login, String password) throws Exception {
        if (login.isEmpty() || password.isEmpty() || password.contains(" ") || login.contains(" ") || password.length() < 8) {
            throw new Exception();
        }
    }
}
