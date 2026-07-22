package com.yashaswini.studentexpensetracker.service;

import com.yashaswini.studentexpensetracker.dto.LoginRequest;
import com.yashaswini.studentexpensetracker.dto.RegisterRequest;
import com.yashaswini.studentexpensetracker.model.User;
import com.yashaswini.studentexpensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.yashaswini.studentexpensetracker.exception.ResourceNotFoundException;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("User Not Found");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Incorrect Password";
        }

        return "Login Successful";
    }
}