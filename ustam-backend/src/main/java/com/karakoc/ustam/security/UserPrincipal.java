package com.karakoc.ustam.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
//bu class, login yapan kisi icin on eleme sorulari iceriyor diyebiliriz.
// adamimiz nonExpired mi? true.
//adamimiz nonLocked mi? true.
//gibisinden, login yapacak kisiye burada bir on eleme yapiyoruz.
public class UserPrincipal implements UserDetails {

    private final String userId;
    private final String email;
    @JsonIgnore
    private final String password;

    private final List<? extends GrantedAuthority> authorities;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // <-- Very important to not forget
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // <-- Very important to not forget
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // <-- Very important to not forget
    }

    @Override
    public boolean isEnabled() {
        return true; // <-- Very important to not forget
    }
}
