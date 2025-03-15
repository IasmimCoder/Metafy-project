package com.ifpb.Metafy.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.config.JwtUtil;
import com.ifpb.Metafy.exceptions.UnauthorizedException;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    @Qualifier("securityPasswordEncoder")  // 🔹 Diz ao Spring qual Bean usar
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        User userOpt = userRepository.findByEmail(loginRequest.getUsername());

        // Aqui você verifica as credenciais do usuário
        if (userOpt.getEmail().equals(loginRequest.getUsername()) && passwordEncoder.matches(loginRequest.getPassword(), userOpt.getPassword())) {
                    return jwtUtil.generateToken(loginRequest.getUsername());
                } else {
                    throw new UnauthorizedException("Invalid credentials");
                }
            }
        }
        
        class LoginRequest {
            private String username;
            private String password;
        
            // Construtor padrão (necessário para a desserialização do JSON)
            public LoginRequest() {}
        
            // Getters
            public String getUsername() {
                return username;
            }
        
            public String getPassword() {
                return password;
            }
        
            // Setters
            public void setUsername(String username) {
                this.username = username;
            }
        
            public void setPassword(String password) {
                this.password = password;
            }
        }        


