package com.ifpb.Metafy.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.ifpb.Metafy.model.Goal;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository; // Para buscar o usuário logado

    @GetMapping
    public ResponseEntity<List<Goal>> getUserGoals() {
        String email = getAuthenticatedUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Goal> goals = goalService.getGoalsByUser(user);
        return ResponseEntity.ok(goals);
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
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(goalService.createGoal(goal, userEmail));
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

    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @RequestBody Goal goal) {
        return ResponseEntity.ok(goalService.updateGoal(id, goal));
    }

    @DeleteMapping("/{id}")
    public ModelAndView deleteGoal(@PathVariable Long id, Model model) {
        goalService.deleteGoal(id);
        List<Goal> goals = goalService.getAllGoals();
        model.addAttribute("goals", goals);
        return new ModelAndView("goal/listagemGoals");
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Retorna o email do usuário autenticado
    }
}

