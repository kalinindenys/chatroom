package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLoginAndPassword(String login, String password);
}
