package com.ifpb.Metafy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.dto.UserDTO;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.servlet.ModelAndView;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // @GetMapping("/listarUsuarios")
    // public ResponseEntity<Page<UserDTO>> getPaginatedUsers(
    //         @RequestParam(defaultValue = "0") int page,
    //         @RequestParam(defaultValue = "10") int size,
    //         @RequestParam(required = false) String sort) {
    //     Pageable pageable = (sort != null) ? PageRequest.of(page, size, org.springframework.data.domain.Sort.by(sort)) 
    //                                        : PageRequest.of(page, size);
    //     Page<UserDTO> users = userService.getUsersDTO(pageable);
    //     return ResponseEntity.ok(users);
    // }

    @GetMapping("/listarUsuarios")
    public List<User> listarUsuarios(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userService.getUsers(pageable);
        
        // Aqui, você retorna a lista de usuários sem as informações de paginação
        return userPage.getContent();
    }

    @GetMapping("/usuarios")
    public ModelAndView exibirUsuarios(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "5") int size, Model model) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userService.getUsers(pageable);  
        
        model.addAttribute("userPage", userPage);
        return new ModelAndView("usuario/listarUsuarios"); // Nome do arquivo HTML
    }

    
    @GetMapping("/showIndex")
    public ModelAndView showIndex(Model model) {
        List<User> users = userService.getAllUsers();  
        model.addAttribute("users", users);  
        return new ModelAndView("usuario/listarUsuarios"); 
    }

    @GetMapping("/cadastrarUsuario")
    public ModelAndView createUser() {
        return new ModelAndView("usuario/formUsuario");
    }


    @PostMapping("/deletarUsuario/{id}")
    public ModelAndView deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ModelAndView("redirect:/api/users/usuarios"); // Redireciona para a lista de usuários
    }


    @PostMapping("/cadastrarUsuario")
    public ModelAndView createUser(@ModelAttribute User user) {
        userService.createUser(user);
        return new ModelAndView("redirect:/");
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/atualizarUsuario/{id}")
    public ModelAndView updateUser(@PathVariable Long id, @ModelAttribute User user) {
        userService.updateUser(id, user);
        return new ModelAndView("usuario/atualizarUsuario");
    }
    
}
