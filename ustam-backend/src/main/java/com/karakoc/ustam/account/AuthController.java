package com.karakoc.ustam.account;

import com.karakoc.ustam.account.requests.LoginRequest;
import com.karakoc.ustam.account.requests.LoginResponse;
import com.karakoc.ustam.account.requests.RegisterRequest;
import com.karakoc.ustam.user.UserDTO;
import com.karakoc.ustam.security.UserPrincipal;
import com.karakoc.ustam.managers.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@Tag(name = "ACCOUNT CONTROLLER")
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.attemptLogin(request.getEmail(),request.getPassword());

    }

    @PostMapping("/register")
    public Optional register(@RequestBody RegisterRequest request) {
        return authService.attemptRegister(request.getEmail(),request.getPassword(),request.getRole());
    }

    @GetMapping("/getMe")
    public Optional getMe(@AuthenticationPrincipal UserPrincipal principal){
        return userService.getUserWithEmail(principal.getEmail());
    }


}
