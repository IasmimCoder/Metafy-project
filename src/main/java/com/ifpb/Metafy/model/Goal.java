package com.ifpb.Metafy.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Data
@Table(name = "goals")
@NoArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    
    private String title;
    private String description;
    private Double goalValue;
    private Double accumulatedValue;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date deadline;
    
}

