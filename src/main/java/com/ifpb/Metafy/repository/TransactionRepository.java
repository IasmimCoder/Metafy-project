package com.ifpb.Metafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ifpb.Metafy.model.Transaction;
import com.ifpb.Metafy.model.User;

import jakarta.transaction.Transactional; 

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);

    @Modifying
    @Transactional
    @Query("UPDATE Transaction t SET t.category = null WHERE t.category.id = :categoryId")
    void updateCategoryToNull(@Param("categoryId") Long categoryId);

}

