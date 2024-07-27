package com.karakoc.ustam.requestmodels.auth;


import com.karakoc.ustam.account.AuthType;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private AuthType role;
}
