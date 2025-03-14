package com.ifpb.Metafy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtAuthFilter jwtAuthFilter;

    public WebConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitir CORS para todas as origens (pode restringir conforme necessário)
        registry.addMapping("/**")  // Permitir para todas as APIs que começam com /api
                .allowedOrigins("http://localhost:5173")  // Origem do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")  // Métodos permitidos
                .allowedHeaders("*");  // Permitir todos os cabeçalhos
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(customCorsConfigurationSource())  // Configuração de CORS
            .and()
            .csrf().disable()  // Desabilita CSRF
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()  // Permite acesso a autenticação
                .anyRequest().authenticated()  // Exige autenticação para outras requisições
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);  // API sem estado

        return http.build();  // Apenas uma vez no final
    }

    @Bean
    public CorsConfigurationSource customCorsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
