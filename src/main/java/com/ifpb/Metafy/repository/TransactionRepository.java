package com.ifpb.Metafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Transaction;
import com.ifpb.Metafy.model.User; 

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}

