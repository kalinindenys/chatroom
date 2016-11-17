package com.javaclasses.chatroom.hsqlmem;

import com.javaclasses.chatroom.config.SpringTestConfig;
import com.javaclasses.chatroom.persistence.SecurityTokenRepository;
import com.javaclasses.chatroom.persistence.UserRepository;
import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import com.javaclasses.chatroom.persistence.entity.User;
import com.javaclasses.chatroom.service.*;
import com.javaclasses.chatroom.service.DTO.SecurityTokenDTO;
import com.javaclasses.chatroom.service.DTO.UserDTO;
import com.javaclasses.chatroom.service.tinytypes.Login;
import com.javaclasses.chatroom.service.tinytypes.Password;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.time.LocalDateTime;

import static junit.framework.TestCase.assertNull;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.mockito.ArgumentMatchers.any;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { SpringTestConfig.class })
@WebAppConfiguration
@Transactional
public class AuthenticationServiceInMemoryTest {

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
    private User REGISTERED_USER;

    private SecurityToken VALID_SECURITY_TOKEN;
    private final SecurityToken EXPIRED_SECURITY_TOKEN = new SecurityToken("expired security token", REGISTERED_USER, LocalDateTime.now().minusHours(1));

    @Before
    public void setUp() throws Exception {
        final String passwordHash = "5f4dcc3b5aa765d61d8327deb882cf99"; // for password

        REGISTERED_USER = userRepository.save(new User(REGISTERED_LOGIN, passwordHash));
        VALID_SECURITY_TOKEN = securityTokenRepository.save(new SecurityToken("valid security token", REGISTERED_USER, LocalDateTime.now().plusHours(1)));
    }

    @Test
    public void signUp_unregisteredLogin_correctPasswordConfirmation() throws LoginAlreadyExistsException, PasswordConfirmationException {
        authenticationService.signUp(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD), new Password(PASSWORD));

        final User registeredUser = userRepository.findByLogin(UNREGISTERED_LOGIN);

        assertEquals(registeredUser.getLogin(), UNREGISTERED_LOGIN);
        assertNotEquals(registeredUser.getPassword(), PASSWORD);
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

        authenticationService.signUp(new Login(REGISTERED_LOGIN), new Password(PASSWORD), new Password(PASSWORD));
    }

    @Test
    public void signIn_registeredUser() throws AuthenticationException {
        final SecurityTokenDTO securityTokenDTO = authenticationService.signIn(new Login(REGISTERED_LOGIN), new Password(PASSWORD));

        final SecurityToken securityToken = securityTokenRepository.findByToken(securityTokenDTO.getToken());

        assertEquals(REGISTERED_USER.getId(), securityToken.getUser().getId());
    }

    @Test
    public void signIn_unregisteredUser() throws AuthenticationException {
        expectedException.expect(AuthenticationException.class);
        expectedException.expectMessage("Wrong credentials. Login '" + UNREGISTERED_LOGIN + "', password '" + PASSWORD + "'");

        authenticationService.signIn(new Login(UNREGISTERED_LOGIN), new Password(PASSWORD));
    }

    @Test
    public void signOut() {
        authenticationService.signOut(new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken()));

        assertNull(securityTokenRepository.findOne(VALID_SECURITY_TOKEN.getId()));
    }

    @Test
    public void receiveUserDTO_withValidSecurityToken() throws InvalidSecurityTokenException {
        final SecurityTokenDTO securityToken = new SecurityTokenDTO(VALID_SECURITY_TOKEN.getToken());
        final UserDTO expectedDTO = new UserDTO(REGISTERED_USER.getId(), REGISTERED_USER.getLogin());

        final UserDTO actualDTO = authenticationService.retrieveUser(securityToken);

        assertEquals(expectedDTO.getId(), actualDTO.getId());
        assertEquals(expectedDTO.getLogin(), actualDTO.getLogin());
    }

    @Test
    public void receiveUserDTO_withInvalidSecurityToken() throws InvalidSecurityTokenException {
        expectedException.expect(InvalidSecurityTokenException.class);

        authenticationService.retrieveUser(new SecurityTokenDTO(EXPIRED_SECURITY_TOKEN.getToken()));
    }

}
