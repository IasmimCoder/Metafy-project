package com.ifpb.Metafy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Category;
import com.ifpb.Metafy.model.User; 

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
}

