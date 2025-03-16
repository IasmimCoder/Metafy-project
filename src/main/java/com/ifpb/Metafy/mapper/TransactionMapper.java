package com.ifpb.Metafy.mapper;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.ifpb.Metafy.dto.response.TransactionResponseDTO;
import com.ifpb.Metafy.model.Transaction;

@Component
public class TransactionMapper {

// Método para mapear Transaction para TransactionResponseDTO
    public static TransactionResponseDTO toTransactionResponseDTO(Transaction transaction) {
        return new TransactionResponseDTO(
            transaction.getId(),
            transaction.getTitle(),
            transaction.getDescription(),
            transaction.getValue(),
            transaction.getType(),
            transaction.getDate(),
            transaction.getCategory() != null ? transaction.getCategory().getId() : null, // Verificando se a categoria é nula
            transaction.getCategory() != null ? transaction.getCategory().getName() : null // Verificando se a categoria é nula
        );
    }

    public static List<TransactionResponseDTO> toTransactionResponseDTO(List<Transaction> transactions) {
        return transactions.stream()
                        .map(TransactionMapper::toTransactionResponseDTO)
                        .collect(Collectors.toList());
    }
}
