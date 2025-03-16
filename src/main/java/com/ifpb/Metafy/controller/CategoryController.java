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
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody Category category) {
        String userEmail = getAuthenticatedUserEmail();
        return ResponseEntity.ok(categoryService.createCategory(category, userEmail));
    }


    @PutMapping("/{id}")
    public CategoryResponseDTO updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        String userEmail = getAuthenticatedUserEmail();
        try {
            categoryService.deleteCategory(id, userEmail);
            return ResponseEntity.ok("Categoria deletada com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    private String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Retorna o email do usuário autenticado
    }
}

