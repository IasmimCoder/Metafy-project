package com.ifpb.Metafy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    
    @GetMapping("/listarUsuarios")
    public ModelAndView showIndex(Model model) {
        List<User> users = userService.getAllUsers();  
        model.addAttribute("users", users);  
        return new ModelAndView("usuario/listarUsuarios"); 
    }
    @GetMapping("/cadastrarUsuario")
    public ModelAndView createUser() {
        return new ModelAndView("usuario/formUsuario");
    }
    
    @PostMapping("/cadastrarUsuario")
    public ModelAndView createUser(@ModelAttribute User user) {
        userService.createUser(user);
        return new ModelAndView("index");
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
}
