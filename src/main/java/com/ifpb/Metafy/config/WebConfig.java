package com.ifpb.Metafy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //private final JwtAuthFilter JwtAuthFilter;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitir CORS para todas as origens (pode restringir conforme necessário)
        registry.addMapping("/**")  // Permitir para todas as APIs que começam com /api
                .allowedOrigins("http://localhost:5173")  // Origem do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")  // Métodos permitidos
                .allowedHeaders("*");  // Permitir todos os cabeçalhos
    }

    @Bean(name = "webPasswordEncoder")
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}

