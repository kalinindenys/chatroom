package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.AuthenticationException;
import com.javaclasses.chatroom.service.AuthenticationService;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signIn")
    @ResponseBody
    public String signIn(@RequestParam(value = "login", required = false) String login, @RequestParam(value = "password", required = false) String password) {

//        SecurityToken securityToken = authenticationService.signIn(login, password);

        try {
            SecurityToken securityToken = authenticationService.signIn(new Login("123"), new Password("123"));
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }

        return "1";
    }

}
