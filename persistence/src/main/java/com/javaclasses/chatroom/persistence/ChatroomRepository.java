package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.Chatroom;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatroomRepository extends PagingAndSortingRepository<Chatroom, Long> {
    Iterable<Chatroom> findAllByName(String name);
}
