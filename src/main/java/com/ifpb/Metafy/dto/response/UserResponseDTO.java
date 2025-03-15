package com.ifpb.Metafy.dto.response;

import java.time.LocalDateTime;
import java.util.Date;

public class UserResponseDTO {
    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String sexo;
    private Date creationDate;
    private String username;  // Não inclui a senha

    // Construtores, getters e setters

    public UserResponseDTO(Long id, String name, String cpf, String email, String sexo, Date creationDate, String username) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.sexo = sexo;
        this.creationDate = creationDate;
        this.username = username;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
