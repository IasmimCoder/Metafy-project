package com.ifpb.Metafy.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ifpb.Metafy.model.User;

 

public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
}
