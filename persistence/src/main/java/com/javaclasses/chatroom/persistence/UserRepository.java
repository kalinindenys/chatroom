package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);

    User findByLoginAndPassword(String login, String password);
}
