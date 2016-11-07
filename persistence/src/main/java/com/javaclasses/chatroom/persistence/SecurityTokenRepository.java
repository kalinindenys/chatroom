package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface SecurityTokenRepository extends CrudRepository<SecurityToken, Long> {

    void deleteByExpirationDateLessThan(LocalDateTime now);
    SecurityToken findByToken(String token);

}
