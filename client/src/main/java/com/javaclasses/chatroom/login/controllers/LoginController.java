package com.javaclasses.chatroom.login.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @RequestMapping("/login")
    public int login() {
        return 1;
    }

//    @RequestMapping(value = { "/", "/hello" }, method = RequestMethod.GET)
//    public ModelAndView homePage() {
//
//        ModelAndView model = new ModelAndView();
//        model.setViewName("index");
//
//        return model;
//    }
//
//    @RequestMapping(value = { "/login" }, method = RequestMethod.GET)
//    public ModelAndView login() {
//
//        ModelAndView model = new ModelAndView();
//        model.setViewName("login");
//
//        return model;
//    }
//
////    @RequestMapping(value = { "/loginError" }, method = RequestMethod.GET)
////    public ModelAndView loginError() {
////
////        ModelAndView model = new ModelAndView();
////        model.addObject("error", "true");
////        model.addObject("msg", "wrong credentials");
////        model.setViewName("login");
////
////        return model;
////    }
//
//    @RequestMapping(value = { "/login" }, method = RequestMethod.POST)
////    public ModelAndView submitLogin(Model inpModel, @ModelAttribute("loginBean") LoginBean loginbean) {
//    public ModelAndView submitLogin() {
//
//        ModelAndView model = new ModelAndView();
//        model.setViewName("loginView");
//
//        return model;
//    }
//
//    @RequestMapping(value = { "/chats" }, method = RequestMethod.GET)
//    public ModelAndView welcomePage() {
//
//        ModelAndView model = new ModelAndView();
//        model.setViewName("secured");
//
//        return model;
//    }

}
