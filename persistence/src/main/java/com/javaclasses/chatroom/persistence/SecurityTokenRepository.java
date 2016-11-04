package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecurityTokenRepository extends CrudRepository<SecurityToken, Long> {
    SecurityToken findByToken(String token);
}
