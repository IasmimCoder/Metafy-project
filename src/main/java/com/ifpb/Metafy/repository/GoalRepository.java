package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Goal; 

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
