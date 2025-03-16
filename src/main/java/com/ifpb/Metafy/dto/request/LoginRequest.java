package com.ifpb.Metafy.dto.request;

public class LoginRequest {
    private String username;
    private String password;

    // Construtor padrão (necessário para a desserialização do JSON)
    public LoginRequest() {
    }

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
