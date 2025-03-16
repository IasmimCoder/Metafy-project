package com.ifpb.Metafy.dto.response;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class TransactionResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Double value;
    private String type;
    private Date date;
    private Long categoryId;
    private String categoryName;

    // Construtor de conversão de entidade para DTO
    public TransactionResponseDTO(Long id, String title, String description, Double value, String type, Date date, Long categoryId, String categoryName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.value = value;
        this.type = type;
        this.date = date;
        this.categoryId = categoryId;
        this.categoryName = categoryName;  // Define o nome da categoria
    }
}

