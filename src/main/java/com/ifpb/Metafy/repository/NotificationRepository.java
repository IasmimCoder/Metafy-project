package com.ifpb.Metafy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ifpb.Metafy.model.Notification; 

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}

