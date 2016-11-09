package com.javaclasses.chatroom;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.UserService;
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

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;

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

    }

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final Long USER_ID = 1L;
    private final String LOGIN = "login";
    private final String OLD_PASSWORD = "old pass";
    private final String NEW_PASSWORD = "new pass";

    private final UserDTO OLD_USER_DTO = new UserDTO(USER_ID, LOGIN, OLD_PASSWORD);
    private final UserDTO NEW_USER_DTO = new UserDTO(USER_ID, LOGIN, NEW_PASSWORD);
    private final User OLD_USER = new User(LOGIN, OLD_PASSWORD);
    private final User NEW_USER = new User(LOGIN, NEW_PASSWORD);

    private final LocalDateTime VALID_SECURITY_TOKEN_EXPIRATION_DATE = LocalDateTime.now().plusHours(12);
    private final LocalDateTime EXPIRED_SECURITY_TOKEN_EXPIRATION_DATE = LocalDateTime.now().minusHours(12);
    private final SecurityToken VALID_SECURITY_TOKEN = new SecurityToken("valid security token", USER_ID, VALID_SECURITY_TOKEN_EXPIRATION_DATE);
    private final SecurityToken EXPIRED_SECURITY_TOKEN = new SecurityToken("invalid security token", USER_ID, EXPIRED_SECURITY_TOKEN_EXPIRATION_DATE);

    @Before
    public void setUp() throws Exception {
        VALID_SECURITY_TOKEN.setId(1L);
        EXPIRED_SECURITY_TOKEN.setId(2L);

        Mockito.when(securityTokenRepository.exists(VALID_SECURITY_TOKEN.getId())).thenReturn(true);
        Mockito.when(securityTokenRepository.exists(EXPIRED_SECURITY_TOKEN.getId())).thenReturn(false);
    }

    @Test
    public void updateUserData_withValidSecurityToken() throws InvalidSecurityTokenException {
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        Mockito.when(userRepository.findOne(USER_ID)).thenReturn(OLD_USER);

        userService.updateUserData(VALID_SECURITY_TOKEN, NEW_USER_DTO);

        Mockito.verify(userRepository).save(userCaptor.capture());
        assertEquals(NEW_USER_DTO.getLogin(), userCaptor.getValue().getLogin());
        assertEquals(NEW_USER_DTO.getPassword(), userCaptor.getValue().getPassword());
    }

    @Test
    public void updateUserData_withInvalidSecurityToken() throws InvalidSecurityTokenException {
        expectedException.expect(InvalidSecurityTokenException.class);

        userService.updateUserData(EXPIRED_SECURITY_TOKEN, NEW_USER_DTO);
    }

}
