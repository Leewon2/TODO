package com.todo.todo.controller;

import com.todo.todo.entity.User;
import com.todo.todo.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String password, HttpSession session){
        User user = userService.login(password);
        session.setAttribute("LOGIN_USER", user.getId());
        return ResponseEntity.ok().build();
    }

}
