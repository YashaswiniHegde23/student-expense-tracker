package com.yashaswini.studentexpensetracker.service;

import com.yashaswini.studentexpensetracker.dto.ProfileRequest;
import com.yashaswini.studentexpensetracker.dto.ProfileResponse;
import com.yashaswini.studentexpensetracker.exception.ResourceNotFoundException;
import com.yashaswini.studentexpensetracker.model.User;
import com.yashaswini.studentexpensetracker.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;


    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));
    }


    public ProfileResponse getProfile() {

        User user = getLoggedInUser();

        String token =
                jwtService.generateToken(user.getEmail());

        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                token
        );
    }


    public ProfileResponse updateProfile(
            ProfileRequest request) {

        User user = getLoggedInUser();

        String currentEmail = user.getEmail();
        String newEmail = request.getEmail();


        if (!currentEmail.equalsIgnoreCase(newEmail)) {

            if (userRepository.existsByEmail(newEmail)) {

                throw new IllegalArgumentException(
                        "Email already exists"
                );
            }

            user.setEmail(newEmail);
        }


        user.setName(request.getName());

        userRepository.save(user);


        String newToken =
                jwtService.generateToken(
                        user.getEmail()
                );


        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                newToken
        );
    }
}