package com.javaclasses.chatroom;

import com.javaclasses.chatroom.entities.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class UserRepositoryImpl implements UserRepository {
    Set<User> tempDB = new HashSet();

    @Override
    public void addUser(User user) {
        if (!tempDB.contains(user)) {
            tempDB.add(user);
        }

    }
}
