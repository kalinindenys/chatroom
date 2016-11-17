package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SecurityTokenRepository extends CrudRepository<SecurityToken, Long> {

    SecurityToken findByToken(String token);
    List<SecurityToken> findByExpirationDateLessThan(LocalDateTime now);

}
