package com.javaclasses.chatroom.hsqlmem;

import com.javaclasses.chatroom.config.SpringTestConfig;
import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AvatarNotFoundException;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import com.javaclasses.chatroom.service.tinytypes.UserId;
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
import java.time.LocalDateTime;
import java.util.Arrays;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { SpringTestConfig.class })
@WebAppConfiguration
@Transactional
public class UserServiceInMemoryTest {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private User USER;
    private SecurityToken VALID_SECURITY_TOKEN;
    private final SecurityToken EXPIRED_SECURITY_TOKEN = new SecurityToken("invalid security token", USER, LocalDateTime.now().minusHours(1));
    private SecurityTokenDTO VALID_SECURITY_TOKEN_DTO;
    private final SecurityTokenDTO EXPIRED_SECURITY_TOKEN_DTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken());

    @Before
    public void setUp() throws Exception {
        USER = userRepository.save(new User("login", "password"));
        VALID_SECURITY_TOKEN = securityTokenRepository.save(new SecurityToken("sec token", USER, LocalDateTime.now().plusHours(1)));
        VALID_SECURITY_TOKEN_DTO = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken());
    }

    @Test
    public void updateUserData_withValidSecurityToken() throws Exception {
        final String loginAfterUpdate = "new login";

        userService.updateUserData(VALID_SECURITY_TOKEN_DTO, new UserDTO(USER.getId(), loginAfterUpdate));

        final User userAfterUpdate = userRepository.findOne(USER.getId());

        assertEquals(loginAfterUpdate, userAfterUpdate.getLogin());
    }

    @Test
    public void updateUserData_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        userService.updateUserData(EXPIRED_SECURITY_TOKEN_DTO, new UserDTO(USER.getId(), "new login"));
    }

    @Test
    public void updateAvatar_withValidSecurityToken() throws Exception {
        final File uploadedFile = new File("src/test/resources/images/uploaded.jpg");
        final byte[] bytes = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(VALID_SECURITY_TOKEN_DTO, new FileInputStream(uploadedFile), new FileExtension("jpg"));
        final AvatarData avatarData = userRepository.findByLogin("login").getAvatarData();

        assertTrue(Arrays.equals(bytes, avatarData.getAvatar()));
        assertEquals("jpg", avatarData.getFileExtension());
    }

    @Test
    public void updateAvatar_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        userService.updateAvatar(EXPIRED_SECURITY_TOKEN_DTO, new FileInputStream("src/test/resources/images/uploaded.jpg"), new FileExtension("jpg"));
    }

    @Test
    public void receiveAvatar_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        userService.receiveAvatar(EXPIRED_SECURITY_TOKEN_DTO, new UserId(1L));
    }

    @Test
    public void receiveAvatar_whichNotUploadedYet() throws Exception {
        expectedException.expect(AvatarNotFoundException.class);

        userService.receiveAvatar(VALID_SECURITY_TOKEN_DTO, new UserId(USER.getId()));
    }

    @Test
    public void receiveAvatar_positiveTest() throws Exception {
        final File avatar = new File("src/test/resources/images/uploaded.jpg");
        final AvatarData expectedAvatarData = new AvatarData(StreamUtils.copyToByteArray(new FileInputStream(avatar)), "jpg");

        userService.updateAvatar(VALID_SECURITY_TOKEN_DTO, new FileInputStream(avatar), new FileExtension("jpg"));
        final AvatarData actualAvatarData = userService.receiveAvatar(VALID_SECURITY_TOKEN_DTO, new UserId(USER.getId()));

        assertTrue(Arrays.equals(expectedAvatarData.getAvatar(), actualAvatarData.getAvatar()));
        assertEquals(expectedAvatarData.getFileExtension(), actualAvatarData.getFileExtension());
    }

}
