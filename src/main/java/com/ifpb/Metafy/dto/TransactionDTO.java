package com.ifpb.Metafy.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.Date;

import com.ifpb.Metafy.model.Transaction;

@Getter
@Setter
public class TransactionDTO {
    private Long id;
    private String title;
    private String description;
    private Double value;
    private String type;
    private Date date;
    private Long categoryId;

    // Construtor de conversão de entidade para DTO
    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.title = transaction.getTitle();
        this.description = transaction.getDescription();
        this.value = transaction.getValue();
        this.type = transaction.getType();
        this.date = transaction.getDate();
        this.categoryId = transaction.getCategory().getId();
    }
}

