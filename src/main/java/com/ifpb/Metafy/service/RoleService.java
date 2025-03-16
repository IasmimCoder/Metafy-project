package com.ifpb.Metafy.service;

import com.ifpb.Metafy.model.Role;
import com.ifpb.Metafy.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public Optional<Role> findByRole(String roleName) {
        return roleRepository.findByRole(roleName);
    }
}