package com.yashaswini.studentexpensetracker.controller;

import com.yashaswini.studentexpensetracker.dto.LoginRequest;
import com.yashaswini.studentexpensetracker.dto.RegisterRequest;
import com.yashaswini.studentexpensetracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}