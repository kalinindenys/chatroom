package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
    Chatroom findByName(String name);
}
