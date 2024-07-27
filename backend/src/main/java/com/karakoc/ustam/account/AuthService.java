package com.karakoc.ustam.account;

import com.karakoc.ustam.requestmodels.auth.LoginResponse;
import org.springframework.http.ResponseEntity;

import java.util.Objects;
import java.util.Optional;

public interface AuthService {
    LoginResponse attemptLogin(String email, String password);
    ResponseEntity<Object> attemptRegister(String email, String password, AuthType type);
}
