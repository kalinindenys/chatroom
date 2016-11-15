package com.javaclasses.chatroom.mock;

import com.javaclasses.chatroom.persistence.AvatarDataRepository;
import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.impl.UserServiceImpl;
import com.javaclasses.chatroom.service.tinytypes.FileExtension;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.StreamUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class UserServiceMockTest {

    @Configuration
    static class AuthenticationServiceTestContextConfiguration {

        @Bean
        public UserService userService() {
            return new UserServiceImpl();
        }

        @Bean
        public UserRepository userRepository() {
            return Mockito.mock(UserRepository.class);
        }

        @Bean
        public SecurityTokenRepository securityToken() {
            return Mockito.mock(SecurityTokenRepository.class);
        }

        @Bean
        public AvatarDataRepository avatarDataRepository() {
            return Mockito.mock(AvatarDataRepository.class);
        }

    }

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;
    @Autowired
    private AvatarDataRepository avatarDataRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final User USER = new User("login", "password");

    private final SecurityToken VALID_SECURITY_TOKEN = new SecurityToken("valid security token", USER, LocalDateTime.now().plusHours(1));
    private final SecurityToken EXPIRED_SECURITY_TOKEN = new SecurityToken("invalid security token", USER, LocalDateTime.now().minusHours(1));

    @Before
    public void setUp() throws Exception {
        USER.setId(1L);

        VALID_SECURITY_TOKEN.setId(1L);
        EXPIRED_SECURITY_TOKEN.setId(2L);

        Mockito.when(securityTokenRepository.findByToken(VALID_SECURITY_TOKEN.getToken())).thenReturn(VALID_SECURITY_TOKEN);
        Mockito.when(securityTokenRepository.findByToken(EXPIRED_SECURITY_TOKEN.getToken())).thenReturn(null);
    }

    @Test
    public void updateUserData_withValidSecurityToken() throws Exception {
        Mockito.when(userRepository.findOne(USER.getId())).thenReturn(USER);

        final ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), "new login", "path"));

        Mockito.verify(userRepository).save(userCaptor.capture());
        assertEquals("new login", userCaptor.getValue().getLogin());
    }

    @Test
    public void updateUserData_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), "new login", "path"));
    }

    @Test
    public void updateAvatar_withValidSecurityToken() throws Exception {
        final ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);
        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken());
        final File uploadedFile = new File("src/test/resources/images/uploaded.jpg");
        final byte[] bytesFromUploadedImage = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(securityTokenDTO, new FileInputStream(uploadedFile), new FileExtension("jpg"));

        Mockito.verify(userRepository).save(argumentCaptor.capture());
        assertTrue(Arrays.equals(bytesFromUploadedImage, argumentCaptor.getValue().getAvatarData().getAvatar()));
        assertEquals("jpg", argumentCaptor.getValue().getAvatarData().getFileExtension());
    }

    @Test
    public void updateAvatar_withInvalidSecurityToken() throws Exception {
        expectedException.expect(InvalidSecurityTokenException.class);

        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken());

        userService.updateAvatar(securityTokenDTO, new FileInputStream("src/test/resources/images/uploaded.jpg"), new FileExtension("jpg"));
    }

}
