package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signIn")
    @ResponseBody
    public String signIn(@RequestParam(value = "login", required = false) String login, @RequestParam(value = "password", required = false) String password) {

//        SecurityToken securityToken = authenticationService.login(login, password);

        SecurityToken securityToken = authenticationService.login("123", "123");

        return "1";
    }

}
