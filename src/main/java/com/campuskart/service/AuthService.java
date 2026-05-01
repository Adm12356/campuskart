package com.campuskart.service;

import com.campuskart.dto.LoginRequest;
import com.campuskart.dto.RegisterRequest;

public interface AuthService {
    String register(RegisterRequest request);
    String login(LoginRequest request);
}