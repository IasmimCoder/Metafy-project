package com.ifpb.Metafy.dto.response;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserResponseDTO {
    private Long id;
    private String name;
    private String cpf;
    private String email;
    private String sexo;
    private Date creationDate;
    private String username;  // Não inclui a senha

    @JsonIgnore // Ignora a serialização de 'categories' ao retornar o usuário
    private List<CategoryResponseDTO> categories; // Lista de categorias

    // Construtores, getters e setters

    public UserResponseDTO(Long id, String name, String cpf, String email, String sexo, Date creationDate, String username, List<CategoryResponseDTO> categories) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.sexo = sexo;
        this.creationDate = creationDate;
        this.username = username;
        this.categories = categories;
    }

    // Getters e setters
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

    public List<CategoryResponseDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryResponseDTO> categories) {
        this.categories = categories;
    }
}
