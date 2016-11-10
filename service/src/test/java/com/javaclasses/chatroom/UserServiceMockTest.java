package com.javaclasses.chatroom;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
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

    private final User USER = new User("login", "password");
//    private final UserDTO USER_DTO = new UserDTO(1L, USER.getLogin(), USER.getPassword());

    private final SecurityToken VALID_SECURITY_TOKEN = new SecurityToken("valid security token", USER, LocalDateTime.now().plusHours(1));
    private final SecurityToken EXPIRED_SECURITY_TOKEN = new SecurityToken("invalid security token", USER, LocalDateTime.now().minusHours(1));

    @Before
    public void setUp() throws Exception {
        USER.setId(1L);

        VALID_SECURITY_TOKEN.setId(1L);
        EXPIRED_SECURITY_TOKEN.setId(2L);

        Mockito.when(securityTokenRepository.exists(VALID_SECURITY_TOKEN.getId())).thenReturn(true);
        Mockito.when(securityTokenRepository.exists(EXPIRED_SECURITY_TOKEN.getId())).thenReturn(false);
    }

    @Test
    public void updateUserData_withValidSecurityToken() throws InvalidSecurityTokenException {
        Mockito.when(userRepository.findOne(USER.getId())).thenReturn(USER);

        final ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getId(), VALID_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), "new login", "path"));

        Mockito.verify(userRepository).save(userCaptor.capture());
        assertEquals("new login", userCaptor.getValue().getLogin());
    }

    @Test
    public void updateUserData_withInvalidSecurityToken() throws InvalidSecurityTokenException {
        expectedException.expect(InvalidSecurityTokenException.class);

        final SecurityTokenDTO securityTokenDTO = new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getId(), EXPIRED_SECURITY_TOKEN.getToken());

        userService.updateUserData(securityTokenDTO, new UserDTO(USER.getId(), "new login", "path"));
    }

}
