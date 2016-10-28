package com.javaclasses.chatroom.login.controller;

import com.javaclasses.chatroom.login.LoginBean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @RequestMapping(value = { "/", "/hello" }, method = RequestMethod.GET)
    public ModelAndView homePage() {

        ModelAndView model = new ModelAndView();
        model.setViewName("index");

        return model;
    }

    @RequestMapping(value = { "/login" }, method = RequestMethod.GET)
    public ModelAndView login() {

        ModelAndView model = new ModelAndView();
        model.setViewName("login");

        return model;
    }

    @RequestMapping(value = { "/loginError" }, method = RequestMethod.GET)
    public ModelAndView loginError() {

        ModelAndView model = new ModelAndView();
        model.addObject("error", "true");
        model.addObject("msg", "wrong credentials");
        model.setViewName("login");

        return model;
    }

    @RequestMapping(value = { "/login" }, method = RequestMethod.POST)
//    public ModelAndView submitLogin(Model inpModel, @ModelAttribute("loginBean") LoginBean loginbean) {
    public ModelAndView submitLogin() {

        ModelAndView model = new ModelAndView();
        model.setViewName("login");

        return model;
    }

    @RequestMapping(value = { "/chats" }, method = RequestMethod.GET)
    public ModelAndView welcomePage() {

        ModelAndView model = new ModelAndView();
        model.setViewName("secured");

        return model;
    }

}
