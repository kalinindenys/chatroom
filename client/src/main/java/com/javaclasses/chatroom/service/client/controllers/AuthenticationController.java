package com.javaclasses.chatroom.service.client.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.javaclasses.chatroom.service.*;
import com.javaclasses.chatroom.service.DTO.*;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.slf4j.LoggerFactory.getLogger;

@RestController
@RequestMapping("/api/auth/")
public class AuthenticationController {

    private static final Logger LOG = getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("signUp")
    public ResponseEntity<?> signUp(@RequestBody SignUpInfo signUpInfo) {
        Login login = new Login(signUpInfo.getLogin());
        Password password = new Password(signUpInfo.getPassword());
        Password passwordConfirmation = new Password(signUpInfo.getPasswordConfirmation());

        try {
            authenticationService.signUp(login, password, passwordConfirmation);
            return ResponseEntity.ok("Signed up");
        } catch (LoginAlreadyExistsException | PasswordConfirmationException ex) {
            if (LOG.isErrorEnabled()) {
                LOG.error(ex.getMessage());
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(ex.getMessage()));
        }
    }

    @PostMapping("signIn")
    public ResponseEntity<?> signIn(@RequestBody SignInInfo signInInfo) {
        SecurityTokenDTO securityToken;

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

    @PostMapping("signOut")
    public ResponseEntity<?> signOut(@RequestHeader(name = "Security-Token") String securityToken) {
        authenticationService.signOut(new SecurityTokenDTO(securityToken));
        return ResponseEntity.ok("Signed out");
    }

    @GetMapping("getUser")
    public ResponseEntity<?> getUser(@RequestHeader(name = "Security-Token") String securityToken) {
        try {
            UserDTO user = authenticationService.retrieveUser(new SecurityTokenDTO(securityToken));
            return ResponseEntity.ok(user);
        } catch (InvalidSecurityTokenException ex) {
            if (LOG.isErrorEnabled()) {
                LOG.error(ex.getMessage());
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestError(ex.getMessage()));
        }
    }

//    @PostMapping("test")
//    public String test() {
//        final JsonNodeFactory nodeFactory = JsonNodeFactory.instance;
//        ObjectNode parent = nodeFactory.objectNode();
//        parent.put("success", false);
//        return "{\"yolo\": true}";
//    }

}
