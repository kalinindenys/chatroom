package com.javaclasses.chatroom.hsqlmem;

import com.javaclasses.chatroom.config.SpringDataTestConfig;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AvatarNotFoundException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.dto.FileExtension;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.dto.UserId;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileInputStream;
import java.util.Arrays;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringDataTestConfig.class})
@WebAppConfiguration
@Transactional
public class UserServiceInMemoryTest {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private User USER;
    private UserId USER_ID;

    @Before
    public void setUp() throws Exception {
        USER = userRepository.save(new User("login", "password"));
        USER_ID = new UserId(USER.getId());
    }

    @Test
    public void updateUserData() throws Exception {
        final String loginAfterUpdate = "new login";

        userService.updateUserData(new UserDTO(USER.getId(), loginAfterUpdate));

        final User userAfterUpdate = userRepository.findOne(USER.getId());

        assertEquals(loginAfterUpdate, userAfterUpdate.getLogin());
    }

    @Test
    public void updateAvatar_withValidSecurityToken() throws Exception {
        final File uploadedFile = new File("src/test/resources/images/uploaded.jpg");
        final byte[] bytes = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(USER_ID, new FileInputStream(uploadedFile), new FileExtension("jpg"));
        final AvatarData avatarData = userRepository.findByLogin("login").getAvatarData();

        assertTrue(Arrays.equals(bytes, avatarData.getAvatar()));
        assertEquals("jpg", avatarData.getFileExtension());
    }

    @Test
    public void receiveAvatarWhichNotUploadedYet() throws Exception {
        expectedException.expect(AvatarNotFoundException.class);

        userService.receiveAvatar(USER_ID);
    }

    @Test
    public void receiveAvatar() throws Exception {
        final File avatar = new File("src/test/resources/images/uploaded.jpg");
        final AvatarData expectedAvatarData = new AvatarData(StreamUtils.copyToByteArray(new FileInputStream(avatar)), "jpg");

        userService.updateAvatar(USER_ID, new FileInputStream(avatar), new FileExtension("jpg"));
        final AvatarData actualAvatarData = userService.receiveAvatar(USER_ID);

        assertTrue(Arrays.equals(expectedAvatarData.getAvatar(), actualAvatarData.getAvatar()));
        assertEquals(expectedAvatarData.getFileExtension(), actualAvatarData.getFileExtension());
    }

}
