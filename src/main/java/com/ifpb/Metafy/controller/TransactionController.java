package com.ifpb.Metafy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.dto.response.TransactionResponseDTO;
import com.ifpb.Metafy.model.Transaction;
import com.ifpb.Metafy.service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getUserTransactions() {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(transactionService.getUserTransactions(userEmail));
    }

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody Transaction transaction) {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(transactionService.createTransaction(transaction, userEmail));
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        String userEmail = getAuthenticatedUserEmail();
        try {
            transactionService.deleteTransaction(id, userEmail);
            return ResponseEntity.ok("Transação deletada com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Retorna o email do usuário autenticado
    }
}

