package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Category; 

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

