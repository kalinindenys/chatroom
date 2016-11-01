package com.javaclasses.chatroom.servlets;

import com.javaclasses.chatroom.RegistrationService;
import com.javaclasses.chatroom.entities.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/RegistrationServlet")
public class RegistrationServlet extends HttpServlet {
    RegistrationService registrationService = new RegistrationService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String registrationForm = "  <div id=\"registrationForm\">\n" +
                "        Login<input id=\"logInInput\" type=\"text\">\n" +
                "        Password<input id=\"passInput\" type=\"password\">\n" +
                "        <button id=\"okSignUpButton\" class=\"btn btn-default\" onclick=\"signUpUser()\">Sign me up!</button>\n" +
                "    </div>";
        PrintWriter out = resp.getWriter();
        out.print(registrationForm);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String login = req.getParameter("login");
        String password = req.getParameter("password");
        User user = new User(login, password);
        registrationService.registrate(user);
        PrintWriter printWriter = resp.getWriter();
        printWriter.print("Welcome, " + login);
    }
}
