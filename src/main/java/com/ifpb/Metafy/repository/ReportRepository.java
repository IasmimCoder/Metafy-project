package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Report; 

public interface ReportRepository extends JpaRepository<Report, Long> {
}

