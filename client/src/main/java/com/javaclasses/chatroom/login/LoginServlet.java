package com.javaclasses.chatroom.login;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.javaclasses.chatroom.AuthenticationException;
import com.javaclasses.chatroom.AuthenticationService;
import com.javaclasses.chatroom.entity.SecurityToken;
import com.javaclasses.chatroom.impl.AuthenticationServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private final static Logger LOG = LoggerFactory.getLogger(LoginServlet.class);

    private final AuthenticationService authenticationService = new AuthenticationServiceImpl();

    private final Gson gson = new Gson();

    public LoginServlet() {
        super();

        if (LOG.isInfoEnabled()) {
            LOG.info("Servlet is initialized");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (LOG.isInfoEnabled()) {
            LOG.info(req.getMethod() + " method invocation");
        }

        final PrintWriter writer = resp.getWriter();
        final LoginInfo loginInfo = gson.fromJson(req.getParameter("loginInfo"), LoginInfo.class);

        try {
            SecurityToken token = authenticationService.login(loginInfo.getLogin(), loginInfo.getPassword());
            writer.print(token.getToken());
        } catch (AuthenticationException ex) {
            writer.print(ex.getMessage());
        }
    }

}
