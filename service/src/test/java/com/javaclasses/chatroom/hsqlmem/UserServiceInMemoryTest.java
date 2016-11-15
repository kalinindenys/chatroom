package com.javaclasses.chatroom.hsqlmem;

import com.javaclasses.chatroom.config.SpringTestConfig;
import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
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
@ContextConfiguration(classes = { SpringTestConfig.class })
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

    @Before
    public void setUp() throws Exception {
        USER = userRepository.save(new User("login", "password"));
        VALID_SECURITY_TOKEN = securityTokenRepository.save(new SecurityToken("sec token", USER, LocalDateTime.now().plusHours(1)));
    }

    @Test
    public void updateUserData_withValidSecurityToken() throws Exception {
        final String loginAfterUpdate = "new login";
        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), loginAfterUpdate, "avatar URL"));

        final User userAfterUpdate = userRepository.findOne(USER.getId());

        assertEquals(loginAfterUpdate, userAfterUpdate.getLogin());
    }

    @Test
    public void updateUserData_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), "new login", "path"));
    }

    @Test
    public void updateAvatar_withValidSecurityToken() throws Exception {
        final File uploadedFile = new File("src/test/resources/images/uploaded.jpg");
        final byte[] bytes = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(new SecurityTokenDTO("sec token"), new FileInputStream(uploadedFile), new FileExtension("jpg"));
        final AvatarData avatarData = userRepository.findByLogin("login").getAvatarData();

        assertTrue(Arrays.equals(bytes, avatarData.getAvatar()));
        assertEquals("jpg", avatarData.getFileExtension());
    }

    @Test
    public void updateAvatar_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken());

        userService.updateAvatar(securityTokenDTO, new FileInputStream("src/test/resources/images/uploaded.jpg"), new FileExtension("jpg"));
    }

}
