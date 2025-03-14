package com.ifpb.Metafy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ifpb.Metafy.dto.UserDTO;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.model.Role;

 

public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    
    User findByEmail(String email);
    User findByName(String name);
    Optional<UserDTO> findDtoByEmail(String email);
    List<Role> listRole(Long id);
}
