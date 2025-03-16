package com.ifpb.Metafy.dto.request;

public class CategoryRequestDTO {
    private String name;
    private String description;

    // Construtores, getters e setters

    public CategoryRequestDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
