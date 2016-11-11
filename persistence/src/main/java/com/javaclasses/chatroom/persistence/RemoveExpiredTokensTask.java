package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.SecurityToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RemoveExpiredTokensTask {

    private final Logger LOG = LoggerFactory.getLogger(RemoveExpiredTokensTask.class);

    @Autowired
    SecurityTokenRepository securityTokenRepository;

    @Scheduled(fixedDelay = 60000)
    public void removeExpiredTokens() {
        List<SecurityToken> expiredTokens = securityTokenRepository.findByExpirationDateLessThan(LocalDateTime.now());
        securityTokenRepository.delete(expiredTokens);

        if (LOG.isInfoEnabled()) {
            LOG.info("Expired tokens removed");
        }
    }

}
