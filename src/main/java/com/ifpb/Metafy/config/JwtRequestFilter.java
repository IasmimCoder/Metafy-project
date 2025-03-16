package com.ifpb.Metafy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        try {
            String jwt = null;
            String username = null;

            // Extrai o token JWT do header Authorization
            String header = request.getHeader("Authorization");

            if (header != null && header.startsWith("Bearer ")) {
                jwt = header.substring(7);
                username = jwtUtil.extractUsername(jwt);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (jwtUtil.validateToken(jwt, username)) {
                    // Criação do Authentication no contexto de segurança
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            username, null, new ArrayList<>());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                } else if (jwtUtil.isTokenExpired(jwt)) {
                    throw new ServletException("Token expirado");
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            HttpServletResponse res = (HttpServletResponse) response;
            if (e.getMessage().equals("Token expirado")) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.getWriter().write("Token expirado. Por favor, faça login novamente.");
            } else if (e.getMessage().equals("Token inválido")) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.getWriter().write("Token inválido. Verifique suas credenciais.");
            } else {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.getWriter().write("Erro no processamento do token: " + e.getMessage());
            }
            res.getWriter().flush();
            return;
        }
    }

    @SuppressWarnings("null")
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().equals("/auth/login"); // Permite acesso ao login
    }

}
