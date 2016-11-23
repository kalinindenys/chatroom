package com.javaclasses.chatroom.service.client.controllers;

import com.javaclasses.chatroom.service.AvatarNotUpdatedException;
import com.javaclasses.chatroom.service.tinytypes.SecurityTokenDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.slf4j.LoggerFactory.getLogger;

@RestController
@RequestMapping("api/user/")
public class UserController {

    private static final Logger LOG = getLogger(AuthenticationController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> resetPassword() {



        return null;
    }

    @PostMapping("/updateAvatar")
    public ResponseEntity<?> updateAvatar(@RequestBody MultipartFile multipartFile, SecurityTokenDTO securityToken) {

        try {
            userService.updateAvatar(securityToken, multipartFile.getInputStream(), new FileExtension(multipartFile.getContentType()));
        } catch (InvalidSecurityTokenException e) {
            e.printStackTrace();
        } catch (AvatarNotUpdatedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
