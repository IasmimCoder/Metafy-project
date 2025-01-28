package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.dto.UserDTO;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //funciona??

    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Page<UserDTO> getUsersDTO(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(this::convertToDTO);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(user);
    }

    //funciona??

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        // Não expor a senha diretamente
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

