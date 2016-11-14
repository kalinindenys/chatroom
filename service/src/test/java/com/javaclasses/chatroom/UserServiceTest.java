package com.javaclasses.chatroom;

import com.javaclasses.chatroom.config.SpringDataConfig;
import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.util.Arrays;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { SpringDataConfig.class })
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Before
    public void setUp() throws Exception {
        final User registeredUser = userRepository.save(new User("login", "password"));
        securityTokenRepository.save(new SecurityToken("sec token", registeredUser, LocalDateTime.now().plusHours(1)));
    }

    @Test
    public void updateAvatar() throws Exception {
        final File uploadedFile = new File("C:\\Users\\dmytro.grankin\\IdeaProjects\\chatroom_project\\service\\src\\test\\java\\com\\javaclasses\\chatroom\\avatars\\uploaded.jpg");
        final byte[] bytes = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(new SecurityTokenDTO("sec token"), new FileInputStream(uploadedFile), new FileExtension("jpg"));
        final AvatarData avatarData = userRepository.findByLogin("login").getAvatarData();

        assertTrue(Arrays.equals(bytes, avatarData.getAvatar()));
        assertEquals("jpg", avatarData.getFileExtension());
    }

}
