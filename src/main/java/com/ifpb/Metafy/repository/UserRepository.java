package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.User; 

public interface UserRepository extends JpaRepository<User, Long> {
}

