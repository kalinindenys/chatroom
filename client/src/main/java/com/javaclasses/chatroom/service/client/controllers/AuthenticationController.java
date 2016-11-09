package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.service.AuthenticationException;
import com.javaclasses.chatroom.service.AuthenticationService;
import com.javaclasses.chatroom.service.DTO.RequestError;
import com.javaclasses.chatroom.service.DTO.SignInInfo;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.slf4j.LoggerFactory.getLogger;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private static final Logger LOG = getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody SignInInfo signInInfo) {
        SecurityToken securityToken;

        try {
            securityToken = authenticationService.signIn(new Login(signInInfo.getLogin()), new Password(signInInfo.getPassword()));
            return ResponseEntity.ok(securityToken);
        } catch (AuthenticationException ex) {
            if (LOG.isErrorEnabled()) {
                LOG.error(ex.getMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(ex.getMessage()));
        }
    }

}
