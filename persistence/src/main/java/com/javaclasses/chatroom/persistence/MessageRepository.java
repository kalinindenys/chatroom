package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
}
