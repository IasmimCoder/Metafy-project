package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.model.Category;
import com.ifpb.Metafy.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Lista todas as categorias
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Busca uma categoria por ID
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // // Busca uma categoria por nome
    // public Optional<Category> getCategoryByName(String name) {
    //     return categoryRepository.findByName(name);
    // }

    // Cria uma nova categoria
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Atualiza uma categoria existente
    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        return categoryRepository.save(category);
    }

    // Deleta uma categoria por ID
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}

