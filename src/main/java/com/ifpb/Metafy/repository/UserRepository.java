package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ifpb.Metafy.model.User;

 

public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    
    User findByEmail(String email);
    User findByName(String name);
}
