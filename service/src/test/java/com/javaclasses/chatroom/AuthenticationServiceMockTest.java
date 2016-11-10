package com.javaclasses.chatroom;

import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.*;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.impl.AuthenticationServiceImpl;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.junit.*;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.method.P;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;

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

    private final SecurityToken VALID_SECURITY_TOKEN = new SecurityToken("valid security token", REGISTERED_USER, LocalDateTime.now().plusHours(1));
    private final SecurityToken INVALID_SECURITY_TOKEN = new SecurityToken("expired security token", REGISTERED_USER, LocalDateTime.now().minusHours(1));

    @Before
    public void setUp() throws Exception {
        REGISTERED_USER.setId(1L);
        UNREGISTERED_USER.setId(2L);

        VALID_SECURITY_TOKEN.setId(1L);
        INVALID_SECURITY_TOKEN.setId(2L);

        Mockito.when(userRepository.findByLogin(REGISTERED_LOGIN)).thenReturn(REGISTERED_USER);
        Mockito.when(userRepository.findByLoginAndPassword(REGISTERED_LOGIN, PASSWORD)).thenReturn(REGISTERED_USER);
        Mockito.when(userRepository.findOne(VALID_SECURITY_TOKEN.getUser().getId())).thenReturn(REGISTERED_USER);
        Mockito.when(securityTokenRepository.exists(VALID_SECURITY_TOKEN.getId())).thenReturn(true);
        Mockito.when(securityTokenRepository.exists(INVALID_SECURITY_TOKEN.getId())).thenReturn(false);
        Mockito.when(securityTokenRepository.findOne(VALID_SECURITY_TOKEN.getId())).thenReturn(VALID_SECURITY_TOKEN);
    }

    @Test
    public void signUp_unregisteredLogin_correctPasswordConfirmation() throws LoginAlreadyExistsException, PasswordConfirmationException {
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        authenticationService.signUp(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD), new Password(PASSWORD));

        Mockito.verify(userRepository).save(userCaptor.capture());
        assertEquals(UNREGISTERED_LOGIN, userCaptor.getValue().getLogin());
        assertNotEquals(PASSWORD, userCaptor.getValue().getPassword());
    }

    @Test
    public void signUp_unregisteredLogin_wrongPasswordConfirmation() throws LoginAlreadyExistsException, PasswordConfirmationException {
        expectedException.expect(PasswordConfirmationException.class);
        expectedException.expectMessage("Password and password confirmation do not match");

        authenticationService.signUp(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD), new Password(PASSWORD + "123"));
    }

    @Test
    public void signUp_registeredLogin() throws LoginAlreadyExistsException, PasswordConfirmationException {
        expectedException.expect(LoginAlreadyExistsException.class);
        expectedException.expectMessage("User with login '" + REGISTERED_LOGIN + "' already exists");

        authenticationService.signUp(new Login(REGISTERED_LOGIN), new Password(PASSWORD), new Password(PASSWORD + "123"));
    }

    @Test
    public void signIn_registeredUser() throws AuthenticationException {
        Mockito.when(securityTokenRepository.save(any(SecurityToken.class))).thenReturn(VALID_SECURITY_TOKEN);

        ArgumentCaptor<SecurityToken> captor = ArgumentCaptor.forClass(SecurityToken.class);

        authenticationService.signIn(new Login(REGISTERED_LOGIN), new Password(PASSWORD));

        Mockito.verify(securityTokenRepository).save(captor.capture());
        assertEquals(VALID_SECURITY_TOKEN.getUser().getId(), captor.getValue().getUser().getId());
    }

    @Test
    public void signIn_unregisteredUser() throws AuthenticationException {
        expectedException.expect(AuthenticationException.class);
        expectedException.expectMessage("Wrong credentials. Login '" + UNREGISTERED_LOGIN + "', password '" + PASSWORD + "'");

        authenticationService.signIn(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD));
    }

    @Test
    public void signOut() {
        Mockito.doReturn(null).when(securityTokenRepository).findOne(VALID_SECURITY_TOKEN.getId());

        authenticationService.signOut(new SecurityTokenDTO(VALID_SECURITY_TOKEN.getId(), VALID_SECURITY_TOKEN.getToken()));

        Mockito.verify(securityTokenRepository).delete(VALID_SECURITY_TOKEN.getId());
        assertNull(securityTokenRepository.findOne(VALID_SECURITY_TOKEN.getId()));
    }

    @Test
    public void receiveUserDTO_withValidSecurityToken() throws InvalidSecurityTokenException {
        SecurityTokenDTO securityToken = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getId(), VALID_SECURITY_TOKEN.getToken());
        UserDTO expectedDTO = new UserDTO(REGISTERED_USER.getId(), REGISTERED_USER.getLogin(), REGISTERED_USER.getPassword());

        UserDTO actualDTO = authenticationService.retrieveUser(securityToken);

        Mockito.verify(securityTokenRepository).findOne(VALID_SECURITY_TOKEN.getId());
        assertEquals(expectedDTO.getId(), actualDTO.getId());
        assertEquals(expectedDTO.getLogin(), actualDTO.getLogin());
        assertEquals(expectedDTO.getAvatarURL(), actualDTO.getAvatarURL());
    }

    @Test
    public void receiveUserDTO_withInvalidSecurityToken() throws InvalidSecurityTokenException {
        expectedException.expect(InvalidSecurityTokenException.class);

        authenticationService.retrieveUser(new SecurityTokenDTO(INVALID_SECURITY_TOKEN.getId(), INVALID_SECURITY_TOKEN.getToken()));
    }

}
