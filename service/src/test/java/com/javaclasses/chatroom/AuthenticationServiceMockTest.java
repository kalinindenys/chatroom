package com.javaclasses.chatroom;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.AuthenticationException;
import com.javaclasses.chatroom.service.AuthenticationService;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.InvalidSecurityTokenException;
import com.javaclasses.chatroom.service.LoginAlreadyExistsException;
import com.javaclasses.chatroom.service.impl.AuthenticationServiceImpl;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.junit.*;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class AuthenticationServiceMockTest {

    @Configuration
    static class AuthenticationServiceTestContextConfiguration {

        @Bean
        public AuthenticationService authenticationService() {
            return new AuthenticationServiceImpl();
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
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityTokenRepository securityTokenRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final String REGISTERED_LOGIN = "login1";
    private final String UNREGISTERED_LOGIN = "login2";
    private final String PASSWORD = "password";
    private final User REGISTERED_USER = new User(REGISTERED_LOGIN, PASSWORD);
    private final User UNREGISTERED_USER = new User(UNREGISTERED_LOGIN, PASSWORD);

    private final Long VALID_TOKEN_ID = 10L;
    private final Long INVALID_TOKEN_ID = 20L;
    private final String VALID_TOKEN = "valid security token";
    private final String INVALID_TOKEN = "invalid security token";
    private final Long REGISTERED_USER_ID = 1L;
    private final Long UNREGISTERED_USER_ID = 2L;
    private final LocalDateTime EXPIRATION_DATE = LocalDateTime.now().plusHours(12);
    private final SecurityToken VALID_SECURITY_TOKEN = new SecurityToken(VALID_TOKEN, REGISTERED_USER_ID, EXPIRATION_DATE);
    private final SecurityToken INVALID_SECURITY_TOKEN = new SecurityToken(INVALID_TOKEN, REGISTERED_USER_ID, EXPIRATION_DATE);

    private final UserDTO USER_DTO = new UserDTO(REGISTERED_USER_ID, REGISTERED_LOGIN, PASSWORD);

    private final String LOGIN_ALREADY_EXISTS = "User with login '" + REGISTERED_LOGIN + "' already exists";
    private final String WRONG_CREDENTIALS = "Wrong credentials";

    @Before
    public void setUp() throws Exception {
        VALID_SECURITY_TOKEN.setId(VALID_TOKEN_ID);
        INVALID_SECURITY_TOKEN.setId(INVALID_TOKEN_ID);

        REGISTERED_USER.setId(REGISTERED_USER_ID);
        UNREGISTERED_USER.setId(UNREGISTERED_USER_ID);

        Mockito.when(userRepository.findByLogin(REGISTERED_LOGIN)).thenReturn(REGISTERED_USER);
        Mockito.when(userRepository.findByLoginAndPassword(REGISTERED_LOGIN, PASSWORD)).thenReturn(REGISTERED_USER);
        Mockito.when(userRepository.findOne(VALID_SECURITY_TOKEN.getUserId())).thenReturn(REGISTERED_USER);

        Mockito.when(securityTokenRepository.exists(VALID_TOKEN_ID)).thenReturn(true);
        Mockito.when(securityTokenRepository.exists(INVALID_TOKEN_ID)).thenReturn(false);
        Mockito.when(securityTokenRepository.findOne(VALID_TOKEN_ID)).thenReturn(VALID_SECURITY_TOKEN);
    }

    @Test
    public void signUp_unregisteredLogin() throws LoginAlreadyExistsException {
        authenticationService.signUp(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD));
        Mockito.verify(userRepository).save(any(User.class));
    }

    @Test
    public void signUp_registeredLogin() throws LoginAlreadyExistsException {
        expectedException.expect(LoginAlreadyExistsException.class);
        expectedException.expectMessage(LOGIN_ALREADY_EXISTS);

        authenticationService.signUp(new Login(REGISTERED_LOGIN), new Password(PASSWORD));
    }

    @Test
    public void signIn_registeredUser() throws AuthenticationException {
        SecurityToken generatedToken = authenticationService.signIn(new Login(REGISTERED_LOGIN), new Password(PASSWORD));

        Mockito.verify(securityTokenRepository).save(any(SecurityToken.class));
        assertNotNull(generatedToken);
    }

    @Test
    public void signIn_unregisteredUser() throws AuthenticationException {
        expectedException.expect(AuthenticationException.class);
        expectedException.expectMessage(WRONG_CREDENTIALS);

        authenticationService.signIn(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD));
    }

    @Test
    public void signOut() {
        Mockito.doReturn(null).when(securityTokenRepository).findOne(VALID_SECURITY_TOKEN.getId());

        authenticationService.signOut(VALID_SECURITY_TOKEN);

        Mockito.verify(securityTokenRepository).delete(VALID_SECURITY_TOKEN.getId());
        assertNull(securityTokenRepository.findOne(VALID_SECURITY_TOKEN.getId()));
    }

    @Test
    public void receiveUserDTO_withValidSecurityToken() throws InvalidSecurityTokenException {
        UserDTO actualDTO = authenticationService.retrieveUserDTO(VALID_SECURITY_TOKEN);

        Mockito.verify(userRepository).findOne(VALID_SECURITY_TOKEN.getUserId());
        assertEquals(USER_DTO.getId(), actualDTO.getId());
        assertEquals(USER_DTO.getLogin(), actualDTO.getLogin());
        assertEquals(USER_DTO.getPassword(), actualDTO.getPassword());
    }

    @Test
    public void receiveUserDTO_withInvalidSecurityToken() throws InvalidSecurityTokenException {
        expectedException.expect(InvalidSecurityTokenException.class);

        authenticationService.retrieveUserDTO(INVALID_SECURITY_TOKEN);
    }

}
