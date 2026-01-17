package com.hospital.booking_system.service;

import com.hospital.booking_system.dto.LoginRequest;
import com.hospital.booking_system.dto.RegisterRequest;
import com.hospital.booking_system.dto.AuthResponse;
import com.hospital.booking_system.model.User;
import com.hospital.booking_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole() != null ? request.getRole() : "CUSTOMER");
        
        userRepository.save(user);
        
        return new AuthResponse(
            "Registration successful", 
            "token-" + user.getId(),
            user.getRole(),
            user.getName()
        );
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        return new AuthResponse(
            "Login successful",
            "token-" + user.getId(),
            user.getRole(),
            user.getName()
        );
    }
}