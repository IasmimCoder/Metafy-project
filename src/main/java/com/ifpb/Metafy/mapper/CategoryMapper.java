package com.ifpb.Metafy.mapper;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.ifpb.Metafy.dto.response.CategoryResponseDTO;
import com.ifpb.Metafy.model.Category;

@Component
public class CategoryMapper {

// Método para mapear Category para CategoryResponseDTO
    public static CategoryResponseDTO toCategoryResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }

    public static List<CategoryResponseDTO> toCategoryResponseDTO(List<Category> categories) {
        return categories.stream()
                        .map(CategoryMapper::toCategoryResponseDTO)
                        .collect(Collectors.toList());
    }
}
