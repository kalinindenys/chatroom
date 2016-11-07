package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);

}
