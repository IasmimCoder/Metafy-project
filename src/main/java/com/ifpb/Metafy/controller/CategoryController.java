package com.ifpb.Metafy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ifpb.Metafy.dto.response.CategoryResponseDTO;
import com.ifpb.Metafy.model.Category;
import com.ifpb.Metafy.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getUserCategories() {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(categoryService.getUserCategories(userEmail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long id) {
        String userEmail = getAuthenticatedUserEmail();
        CategoryResponseDTO categoryResponseDTO = categoryService.getCategoryById(id, userEmail);
        if (categoryResponseDTO == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Se a categoria não pertencer ao usuário
        }
        return ResponseEntity.ok(categoryResponseDTO);
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody Category category) {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(categoryService.createCategory(category, userEmail));
    }


    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        String userEmail = getAuthenticatedUserEmail();
        try {
            CategoryResponseDTO updatedCategory = categoryService.updateCategory(id, category, userEmail);
            return ResponseEntity.ok(updatedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        String userEmail = getAuthenticatedUserEmail();
        try {
            categoryService.deleteCategory(id, userEmail);
            return ResponseEntity.ok("Categoria deletada com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Retorna o email do usuário autenticado
    }
}

