package com.karakoc.ustam.account;

import com.karakoc.ustam.account.requests.LoginResponse;
import com.karakoc.ustam.user.UserDTO;

import java.util.Optional;

public interface AuthService {
    LoginResponse attemptLogin(String email, String password);
    Optional attemptRegister(String email, String password, AuthType type);
}
