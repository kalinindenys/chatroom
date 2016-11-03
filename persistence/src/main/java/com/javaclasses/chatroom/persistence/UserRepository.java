package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLoginAndPassword(String login, String password);
}
