package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SecurityTokenRepository extends JpaRepository<SecurityToken, Long> {

    SecurityToken findByToken(String token);

    List<SecurityToken> findByExpirationDateLessThan(LocalDateTime now);

}
