package com.ifpb.Metafy.dto;

import com.ifpb.Metafy.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String creationDate;  // Formatado para apresentação

    // Construtor para conversão de entidade para DTO
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.creationDate = user.getCreationDate().toString(); 
    }
}
