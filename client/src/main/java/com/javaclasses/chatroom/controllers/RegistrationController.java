package com.javaclasses.chatroom.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/")
public class RegistrationController {

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping("/signUp")
    public void registerUser(@RequestParam("login") String login, @RequestParam("password") String password) {
        System.out.println("Login: " + login);
        System.out.println("Password: " + password);
    }
}
