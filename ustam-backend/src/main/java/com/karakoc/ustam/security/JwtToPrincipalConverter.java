package com.karakoc.ustam.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtToPrincipalConverter {
    public UserPrincipal convert(DecodedJWT jwt){
        return UserPrincipal.builder()
        .userId(jwt.getSubject())
        .email(jwt.getClaim("e").asString())
        .authorities(extractAuthoritiesFromClaim(jwt))
        .build();
        
    }    

    //burada, a claimi icin kullandigimiz seyin (authorities) ismini degistirmek istersen burayi degistir man.
    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var claim= jwt.getClaim("a");
        if(claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }


}

