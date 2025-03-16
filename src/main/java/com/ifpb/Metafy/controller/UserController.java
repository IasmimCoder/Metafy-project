package com.ifpb.Metafy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.servlet.ModelAndView;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // @Autowired
    // private RoleService RoleService;

    @Autowired
    @Qualifier("securityPasswordEncoder")  // 🔹 Diz ao Spring qual Bean usar
    private PasswordEncoder passwordEncoder;

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
    public Page<User> exibirUsuarios(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "5") int size, Model model) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userService.getUsers(pageable);  
        
        return userPage;
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
    public ModelAndView createUser(@RequestBody User user) {
        encriptPassword(user);
        userService.createUser(user);
        return new ModelAndView("redirect:/");
    }

    private void encriptPassword(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
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
    public ModelAndView updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(id, user);
        return new ModelAndView("usuario/atualizarUsuario");
    }
    
}
