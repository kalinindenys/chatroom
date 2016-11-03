package com.javaclasses.chatroom.login.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
//                    .anyRequest().permitAll()
                    .antMatchers("/", "/home", "/signin", "index.html").permitAll()
//                    .antMatchers("index.html/secured").authenticated()
//                    .anyRequest().authenticated()
                    .and()
                .csrf().disable();
//                .authorizeRequests()
//                    .antMatchers("/index.html", "/").permitAll()
//                    .anyRequest().authenticated();

//                    .and()
//                .formLogin()
//                    .loginPage("/login")
//                    .defaultSuccessUrl("/chats")
//                    .usernameParameter("login")
//                    .passwordParameter("password")
//                    .permitAll();

    }

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder auth) throws Exception {
//        auth.jdbcAuthentication().dataSource(dataSource)
//                .usersByUsernameQuery("select login, password, enabled from users where login=?")
//                .authoritiesByUsernameQuery("select login, role from user_roles where username=?"



        auth.inMemoryAuthentication()
                .withUser("1").password("1").roles("USER");

    }

}
