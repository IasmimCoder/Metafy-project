package com.ifpb.Metafy.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.ifpb.Metafy.model.Goal;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.service.GoalService;
import com.ifpb.Metafy.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Goal> getAllGoals() {
        return goalService.getAllGoals();
    }

    @GetMapping("/{id}")
    public Goal getGoalById(@PathVariable Long id) {
        return goalService.getGoalById(id);
    }

    @GetMapping("/cadastrar")
    public ModelAndView mostrarFormularioCadastro(Model model) {
        // Buscar a lista de usuários
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);

        // Retorna a página de cadastro
        return new ModelAndView("goal/formGoal"); // Nome do arquivo HTML
    }

    @PostMapping
    public ModelAndView createGoal(@ModelAttribute Goal goal, Model model) {
        goalService.createGoal(goal);
        List<Goal> goals = goalService.getAllGoals();
        model.addAttribute("goals", goals);
        return new ModelAndView("goal/listagemGoals");
    }

    @GetMapping("/editar/{id}")
    public ModelAndView editarMeta(@PathVariable Long id, Model model) {
        Goal goal = goalService.getGoalById(id);
        model.addAttribute("goal", goal);
        return new ModelAndView("goal/editarMeta"); // Nome da página de edição de meta
    }

    @GetMapping("/listar")
    public ModelAndView listarMetas(Model model) {
        List<Goal> goals = goalService.getAllGoals();
        model.addAttribute("goals", goals);
        return new ModelAndView("goal/listagemGoals"); // Nome do arquivo HTML para listagem
    }

    @PostMapping("/editar/{id}")
    public ModelAndView updateGoal(@PathVariable Long id, @ModelAttribute Goal goal, Model model) {
        goalService.updateGoal(id, goal);
        List<Goal> goals = goalService.getAllGoals();
        model.addAttribute("goals", goals);
        return new ModelAndView("goal/listagemGoals");
    }

    @PostMapping("/deletar/{id}")
    public ModelAndView deleteGoal(@PathVariable Long id, Model model) {
        goalService.deleteGoal(id);
        List<Goal> goals = goalService.getAllGoals();
        model.addAttribute("goals", goals);
        return new ModelAndView("goal/listagemGoals");
    }
}

