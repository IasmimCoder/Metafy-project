package com.ifpb.Metafy.dto;

import com.ifpb.Metafy.model.Goal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalDTO {
    private Long id;
    private String title;
    private String description;
    private Double targetValue;
    private Double accumulatedValue;
    private String startDate;
    private String deadline;

    // Construtor para conversão
    public GoalDTO(Goal goal) {
        this.id = goal.getId();
        this.title = goal.getTitle();
        this.description = goal.getDescription();
        this.targetValue = goal.getGoalValue();
        this.accumulatedValue = goal.getAccumulatedValue();
        this.startDate = goal.getStartDate().toString();
        this.deadline = (goal.getDeadline() != null) ? goal.getDeadline().toString() : null;
    }
}
