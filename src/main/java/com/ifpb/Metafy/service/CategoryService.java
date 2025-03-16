package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.dto.response.CategoryResponseDTO;
import com.ifpb.Metafy.mapper.CategoryMapper;
import com.ifpb.Metafy.model.Category;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.CategoryRepository;
import com.ifpb.Metafy.repository.UserRepository;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<CategoryResponseDTO> getUserCategories(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        List<Category> createdCategory = categoryRepository.findByUser(user);
        return CategoryMapper.toCategoryResponseDTO(createdCategory);
    }

    // Lista todas as categorias
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Busca uma categoria por ID
    public CategoryResponseDTO getCategoryById(Long id, String email) {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().equals(user)) {
            throw new RuntimeException("Você não tem permissão para acessar esta categoria");
        }

        return CategoryMapper.toCategoryResponseDTO(category);
    }

    // // Busca uma categoria por nome
    // public Optional<Category> getCategoryByName(String name) {
    //     return categoryRepository.findByName(name);
    // }

    // Cria uma nova categoria
    public CategoryResponseDTO createCategory(Category category, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        category.setUser(user);
        Category createdCategory = categoryRepository.save(category);
        return CategoryMapper.toCategoryResponseDTO(createdCategory);
    }

    // Atualiza uma categoria existente
    public CategoryResponseDTO updateCategory(Long id, Category category, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        if (!existingCategory.getUser().equals(user)) {
            throw new RuntimeException("Você não tem permissão para editar esta categoria");
        }

        existingCategory.setName(category.getName());
        categoryRepository.save(existingCategory);
        
        return CategoryMapper.toCategoryResponseDTO(existingCategory);
    }

    // Deleta uma categoria por ID
    public void deleteCategory(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        if (!category.getUser().equals(user)) {
            throw new RuntimeException("Acesso negado! Você não pode excluir essa categoria.");
        }

        categoryRepository.delete(category);
    }
}

