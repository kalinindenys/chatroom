package com.javaclasses.chatroom.mock;

import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.AvatarContentType;
import com.javaclasses.chatroom.persistence.entity.AvatarData;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AvatarNotFoundException;
import com.javaclasses.chatroom.service.UserService;
import com.javaclasses.chatroom.service.dto.FileExtension;
import com.javaclasses.chatroom.service.dto.UserDTO;
import com.javaclasses.chatroom.service.dto.UserId;
import com.javaclasses.chatroom.service.impl.UserServiceImpl;
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
    }

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final UserId USER_ID = new UserId(1L);
    private final User USER = new User("login", "password");

    @Before
    public void setUp() throws Exception {
        Mockito.when(userRepository.findOne(USER_ID.getUserId())).thenReturn(USER);
    }

    @Test
    public void updateUserData() throws Exception {
        final ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        userService.updateUserData(new UserDTO(USER_ID.getUserId(), "new login"));

        Mockito.verify(userRepository, times(2)).save(userCaptor.capture());
        assertEquals("new login", userCaptor.getValue().getLogin());
    }

    @Test
    public void updateAvatar() throws Exception {
        final ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);
        final File uploadedFile = new File("src/test/resources/images/uploaded.jpg");
        final byte[] bytesFromUploadedImage = StreamUtils.copyToByteArray(new FileInputStream(uploadedFile));

        userService.updateAvatar(USER_ID, new FileInputStream(uploadedFile), AvatarContentType.JPEG);

        Mockito.verify(userRepository).save(argumentCaptor.capture());
        assertTrue(Arrays.equals(bytesFromUploadedImage, argumentCaptor.getValue().getAvatarData().getAvatar()));
        assertEquals(AvatarContentType.JPEG, argumentCaptor.getValue().getAvatarData().getContentType());
    }

    @Test
    public void receiveAvatarWhichNotUploadedYet() throws Exception {
        expectedException.expect(AvatarNotFoundException.class);

        userService.receiveAvatar(USER_ID);
    }

    @Test
    public void receiveAvatar() throws Exception {
        final User userWithAvatar = new User("log", "pass");
        final File avatar = new File("src/test/resources/images/uploaded.jpg");
        final AvatarData expectedAvatarData = new AvatarData(StreamUtils.copyToByteArray(new FileInputStream(avatar)), AvatarContentType.JPEG);
        userWithAvatar.setAvatarData(expectedAvatarData);
        userWithAvatar.setId(111L);

        Mockito.when(userRepository.findOne(userWithAvatar.getId())).thenReturn(userWithAvatar);

        final AvatarData actualAvatarData = userService.receiveAvatar(new UserId(userWithAvatar.getId()));

        assertTrue(Arrays.equals(expectedAvatarData.getAvatar(), actualAvatarData.getAvatar()));
        assertEquals(expectedAvatarData.getContentType(), actualAvatarData.getContentType());
    }

}
