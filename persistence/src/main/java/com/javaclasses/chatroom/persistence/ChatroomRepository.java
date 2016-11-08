package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entities.Chatroom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends CrudRepository<Chatroom, Long> {
}
