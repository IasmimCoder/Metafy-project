package com.ifpb.Metafy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ifpb.Metafy.dto.TokenDTO;
import com.ifpb.Metafy.dto.UserDTO;
import com.ifpb.Metafy.model.Login;
import com.ifpb.Metafy.service.JwtService;
import com.ifpb.Metafy.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtService jwtService;

    public AuthController(
			AuthenticationManager authenticationManager,
			JwtService jwtService,
			UserService userService) {
       this.authenticationManager = authenticationManager;
       this.jwtService = jwtService;
       this.userService = userService;
   }
   
   @PostMapping("/login")
   public ResponseEntity<?> login(@RequestBody Login login) {
		try {
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
	
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        String token = jwtService.generateToken(authentication);
	
	        UserDTO userdto = userService.findDtoByEmail(login.getEmail());
	        TokenDTO tokendto = new TokenDTO(token, userdto);
	
	        return ResponseEntity.ok(tokendto);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
   }

   @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
    // Remove a autenticação do usuário atual
        SecurityContextHolder.clearContext(); 
        return ResponseEntity.ok("Logout realizado com sucesso!");
    }


}
