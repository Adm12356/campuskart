package com.campuskart.service.impl;

import com.campuskart.dto.LoginRequest;
import com.campuskart.dto.RegisterRequest;
import com.campuskart.model.User;
import com.campuskart.repository.UserRepository;
import com.campuskart.security.JwtUtil;
import com.campuskart.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ injected from SecurityConfig

    @Override
    public String register(RegisterRequest request) {

        // ✅ check if email already exists
        if (repo.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ hashed

        repo.save(user);

        return "User Registered";
    }

    @Override
    public String login(LoginRequest request) {

        User user = repo.findByEmail(request.getEmail());

        // ✅ matches() compares raw password against the stored hash
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}