package com.yashaswini.studentexpensetracker.controller;

import com.yashaswini.studentexpensetracker.dto.ProfileRequest;
import com.yashaswini.studentexpensetracker.dto.ProfileResponse;
import com.yashaswini.studentexpensetracker.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ProfileResponse getProfile() {

        return userService.getProfile();
    }

    @PutMapping("/me")
    public ProfileResponse updateProfile(
            @Valid @RequestBody ProfileRequest request) {

        return userService.updateProfile(request);
    }
}