package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.AvatarData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarDataRepository extends JpaRepository<AvatarData, Long> {

}
