package com.todo.todo.service;

import com.todo.todo.entity.User;
import com.todo.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(String password) {
        User user = userRepository.findByPassword(password);
        if(user==null) throw new IllegalArgumentException("No User");
        return user;
    }
}
