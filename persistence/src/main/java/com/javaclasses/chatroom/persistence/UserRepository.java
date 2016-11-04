package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByLoginAndPassword(String login, String password);
}
