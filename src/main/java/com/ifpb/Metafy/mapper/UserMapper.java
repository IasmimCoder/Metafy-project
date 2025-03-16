package com.ifpb.Metafy.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.ifpb.Metafy.dto.response.CategoryResponseDTO;
import com.ifpb.Metafy.dto.response.UserResponseDTO;
import com.ifpb.Metafy.model.User;

public class UserMapper {
     // Método para mapear User para UserResponseDTO
    public static UserResponseDTO toUserResponseDTO(User user) {
        List<CategoryResponseDTO> categories = user.getCategories().stream()
                .map(CategoryMapper::toCategoryResponseDTO) // Utiliza o CategoryMapper
                .collect(Collectors.toList());

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getCpf(),
                user.getEmail(),
                user.getSexo(),
                user.getCreationDate(),
                user.getUsername(),
                categories
        );
    }
}
