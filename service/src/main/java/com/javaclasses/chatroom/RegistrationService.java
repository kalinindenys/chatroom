package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entities.User;
import com.javaclasses.chatroom.exceptions.RegistrationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

public interface RegistrationService {
    public void registerUser(User user);
}
