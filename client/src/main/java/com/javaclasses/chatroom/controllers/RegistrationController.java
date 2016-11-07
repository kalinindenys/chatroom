package com.javaclasses.chatroom.controllers;

import com.javaclasses.chatroom.RegistrationService;
import com.javaclasses.chatroom.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/signUp")
    @ResponseBody
    public String registrateUser(@RequestParam("login") String login, @RequestParam("password") String password) throws Exception {
        System.out.println("Login: " + login);
        System.out.println("Password: " + password);
        try {
            registrationService.registerUser(new User(login, password));
        } catch (Exception ex) {
            System.out.println("Catched: "  + ex);
        }
        System.out.println("ready");
        return login;
    }
}
