package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.dto.response.TransactionResponseDTO;
import com.ifpb.Metafy.exceptions.NotFoundException;
import com.ifpb.Metafy.mapper.TransactionMapper;
import com.ifpb.Metafy.model.Transaction;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.CategoryRepository;
import com.ifpb.Metafy.repository.TransactionRepository;
import com.ifpb.Metafy.repository.UserRepository;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TransactionResponseDTO> getUserTransactions(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        
        List<Transaction> listedTransactions = transactionRepository.findByUser(user);
        return TransactionMapper.toTransactionResponseDTO(listedTransactions);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public TransactionResponseDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException("Transaction not found"));
        return TransactionMapper.toTransactionResponseDTO(transaction);
    }

    public TransactionResponseDTO createTransaction(Transaction transaction, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        transaction.setUser(user);
        Transaction createdTransaction = transactionRepository.save(transaction);
        return TransactionMapper.toTransactionResponseDTO(createdTransaction);
    }

    public TransactionResponseDTO updateTransaction(Long id, Transaction transactionDetails) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException("Transaction not found"));
        transaction.setTitle(transactionDetails.getTitle());
        transaction.setDescription(transactionDetails.getDescription());
        transaction.setValue(transactionDetails.getValue());
        transaction.setDate(transactionDetails.getDate());
        transaction.setCategory(transactionDetails.getCategory());
        Transaction updatedTransaction = transactionRepository.save(transaction);
        return TransactionMapper.toTransactionResponseDTO(updatedTransaction);
    }

    public void deleteTransaction(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        if (!transaction.getUser().equals(user)) {
            throw new RuntimeException("Acesso negado! Você não pode excluir essa transação.");
        }

        transactionRepository.delete(transaction);    
    }
}

