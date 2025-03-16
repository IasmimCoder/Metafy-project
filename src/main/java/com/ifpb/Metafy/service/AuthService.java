package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.config.JwtUtil;
import com.ifpb.Metafy.dto.request.LoginRequest;
import com.ifpb.Metafy.dto.response.LoginResponse;
import com.ifpb.Metafy.dto.response.UserResponseDTO;
import com.ifpb.Metafy.exceptions.NotFoundException;
import com.ifpb.Metafy.exceptions.UnauthorizedException;
import com.ifpb.Metafy.mapper.CategoryMapper;
import com.ifpb.Metafy.mapper.UserMapper;
import com.ifpb.Metafy.model.User;
import com.ifpb.Metafy.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.stream.Collectors;
import java.time.Duration;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        User userOpt = userRepository.findByEmail(loginRequest.getUsername()).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        // Valida se o usuário existe e se a senha está correta
        if (userOpt != null && passwordEncoder.matches(loginRequest.getPassword(), userOpt.getPassword())) {
            String token = jwtUtil.generateToken(loginRequest.getUsername());

            // Extrai a data de expiração do token
            var expirationDate = jwtUtil.extractExpiration(token);

            // Converte para LocalDateTime para calcular o tempo restante
            LocalDateTime expirationTime = expirationDate.toInstant()
                                                        .atZone(ZoneId.systemDefault())
                                                        .toLocalDateTime();

            // Calculando a duração restante até a expiração (em segundos)
            Duration duration = Duration.between(LocalDateTime.now(), expirationTime);
            long remainingSeconds = duration.getSeconds(); // Tempo restante em segundos
            
            // Criação do DTO para o usuário sem a senha
            UserResponseDTO userResponseDTO = new UserResponseDTO(
                userOpt.getId(),
                userOpt.getName(),
                userOpt.getCpf(),
                userOpt.getEmail(),
                userOpt.getSexo(),
                userOpt.getCreationDate(),
                userOpt.getUsername(),
                CategoryMapper.toCategoryResponseDTO(userOpt.getCategories()) // Mapeia as categorias diretamente
                );

            // Retorna a resposta com o token, tipo do token, data de expiração, tempo restante e dados do usuário (sem senha)
            return new LoginResponse(token, remainingSeconds, expirationTime, userResponseDTO);
        } else {
            throw new UnauthorizedException("Invalid credentials");
        }
    }

    public UserResponseDTO getUserByUsername(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        return UserMapper.toUserResponseDTO(user);
    }
}
