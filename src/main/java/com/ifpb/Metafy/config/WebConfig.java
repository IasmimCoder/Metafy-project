package com.ifpb.Metafy.config;
import java.io.IOException;
import java.util.List;

import org.springframework.cglib.core.internal.CustomizerRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        	.cors(Customizer.withDefaults())
        	.csrf(csrf -> csrf.disable())
        	.authorizeHttpRequests(auth -> auth
        			.requestMatchers("/api/auth/**").permitAll()
        			.requestMatchers(HttpMethod.POST, "/api/user/register").hasRole(ADMIN)
        			.requestMatchers(HttpMethod.POST, "/api/user/basicregister").permitAll()
        			.requestMatchers(HttpMethod.DELETE, "/api/user/delete/**").hasRole(ADMIN)
        			.requestMatchers("/api/user/list").hasAnyRole(ADMIN, MANAGER)
        			.requestMatchers(HttpMethod.PUT, "/api/user/update/**").hasRole(ADMIN)
        			.requestMatchers(HttpMethod.PUT, "/api/user/updatenorules/**")
        							.hasAnyRole(ADMIN, MANAGER)
        			.anyRequest().authenticated()
//        			.requestMatchers(HttpMethod.PUT, "/api/user/update/**").hasRole("ADMIN")
//        			.anyRequest().permitAll()
        	)
        	.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        	.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        http.logout(
        		(logout) -> logout
        		.clearAuthentication(true)
        		.invalidateHttpSession(true)
        		.logoutUrl("/api/auth/logout")
        		.logoutSuccessHandler(new LogoutSuccessHandler() {
					@Override
					public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
							throws IOException, ServletException {
						//Em caso de sucesso no logout, não faz nada
						response.setStatus(HttpServletResponse.SC_OK);
		                response.getWriter().write("Logout realizado com sucesso!");
					}
				})
        );

        return http.build();
    }
}

