package com.javaclasses.chatroom.persistence;

import com.javaclasses.chatroom.persistence.entity.AvatarData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarDataRepository extends CrudRepository<AvatarData, Long> {

}
