package com.ifpb.Metafy.dto.response;

import java.time.LocalDateTime;

public class LoginResponse {
    private String token;
    private long remainingSeconds; // Duração restante em minutos
    private LocalDateTime expirationTime; // Data de expiração
    private UserResponseDTO user; // Dados do usuário

    public LoginResponse(String token, long remainingSeconds, LocalDateTime expirationTime, UserResponseDTO user) {
        this.token = token;
        this.remainingSeconds = remainingSeconds;
        this.expirationTime = expirationTime;
        this.user = user;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getRemainingSeconds() {
        return remainingSeconds;
    }

    public void setRemainingSeconds(long remainingSeconds) {
        this.remainingSeconds = remainingSeconds;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }
    
    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }
}
