package com.karakoc.ustam.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class UserPrincipalAuthenticationToken extends AbstractAuthenticationToken {

    private final UserPrincipal userPrincipal;

    //burada da UserPrincipal.java dosyasindaki gibi, nelere gore isleyecegini programa gosteriyoruz.
    //buralari cok karistirmaniza gerek yok.
    public UserPrincipalAuthenticationToken(UserPrincipal userPrincipal) {
        super(userPrincipal.getAuthorities());
        this.userPrincipal = userPrincipal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        throw new UnsupportedOperationException("Unimplemented method 'getCredentials'");
    }

    @Override
    public UserPrincipal getPrincipal() {
        return userPrincipal;
    }
    
}
