package com.ifpb.Metafy.controller;

import com.ifpb.Metafy.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.dto.request.LoginRequest;
import com.ifpb.Metafy.dto.response.LoginResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
 
    @Autowired
    @Qualifier("securityPasswordEncoder") // 🔹 Diz ao Spring qual Bean usar
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }

}
