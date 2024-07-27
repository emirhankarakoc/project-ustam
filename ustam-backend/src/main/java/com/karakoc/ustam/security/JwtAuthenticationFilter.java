package com.karakoc.ustam.security;

import java.io.IOException;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final TokenManager tokenManager;
    private final JwtToPrincipalConverter jwtToPrincipalConverter;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                extractTokenFromAuthorizationHeader(request)
                .map(tokenManager::decode)
                    .map(jwtToPrincipalConverter::convert)
                        .map(UserPrincipalAuthenticationToken::new)
                            .ifPresent(
                                    authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));

                filterChain.doFilter(request, response);

                
    }

    private Optional<String> extractTokenFromAuthorizationHeader(HttpServletRequest request){
        var token = request.getHeader("Authorization");
        if(StringUtils.hasText(token)&& token.startsWith("Bearer ")) 
        {
            return Optional.of(token.substring(7));
        }
        return Optional.empty();
    }
    
}
