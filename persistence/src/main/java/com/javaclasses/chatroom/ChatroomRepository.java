package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entities.Chatroom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends CrudRepository<Chatroom, Long> {
}
