package com.ifpb.Metafy.controller;

import com.ifpb.Metafy.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.config.JwtUtil;
import com.ifpb.Metafy.dto.request.LoginRequest;
import com.ifpb.Metafy.dto.response.LoginResponse;
import com.ifpb.Metafy.dto.response.UserResponseDTO;
import com.ifpb.Metafy.exceptions.UnauthorizedException;

@RestController
@RequestMapping("/auth")
public class AuthController {
 
    @Autowired
    @Qualifier("securityPasswordEncoder") // 🔹 Diz ao Spring qual Bean usar
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        LoginResponse loginResponse = authService.authenticateUser(loginRequest);
        
        // Criar o cookie seguro com o token
        Cookie tokenCookie = new Cookie("token", loginResponse.getToken());
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(true);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge((int) loginResponse.getRemainingSeconds());
    
        response.addCookie(tokenCookie);
    
        return loginResponse;
    }

    // Rota para retornar os dados do usuário autenticado
    @GetMapping("/me")
    public UserResponseDTO getUserData(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String token = null;
        
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        // Se não encontrar o token ou se for inválido
        if (token == null || !jwtUtil.validateToken(token, jwtUtil.extractUsername(token))) {
            throw new UnauthorizedException("Token inválido ou expirado.");
        }

        // Aqui o token é válido, então você pode extrair os dados do usuário
        String username = jwtUtil.extractUsername(token);
        return authService.getUserByUsername(username); // Método para buscar o usuário no banco de dados
    }
    

}
