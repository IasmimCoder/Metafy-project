package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Transaction; 

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}

