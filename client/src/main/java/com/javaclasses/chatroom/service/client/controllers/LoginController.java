package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signIn")
    @ResponseBody
    public String signIn(@RequestParam("login") String login, @RequestParam("password") String password) {

        SecurityToken securityToken = authenticationService.login(login, password);

        return securityToken.getToken();
    }

}
