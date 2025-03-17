package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.model.Goal;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.GoalRepository;
import com.ifpb.Metafy.repository.UserRepository;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal getGoalById(Long id) {
        return goalRepository.findById(id).orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    public List<Goal> getGoalsByUser(User user) {
        return goalRepository.findByUserId(user.getId());
    }

    public Goal createGoal(Goal goal, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        goal.setUser(user);
        goal.setAccumulatedValue(Double.valueOf(0));
        return goalRepository.save(goal);
    }

    public Goal updateGoal(Long id, Goal goalDetails) {
        Goal goal = goalRepository.findById(id).orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setTitle(goalDetails.getTitle());
        goal.setDescription(goalDetails.getDescription());
        
        if(goalDetails.getGoalValue() > goal.getGoalValue() && goalDetails.getGoalValue() > goalDetails.getAccumulatedValue()){
            goal.setCompleted(false);
        }
        goal.setGoalValue(goalDetails.getGoalValue());
        return goalRepository.save(goal);
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}

