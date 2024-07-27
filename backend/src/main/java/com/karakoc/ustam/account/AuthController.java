package com.karakoc.ustam.account;

import com.karakoc.ustam.requestmodels.auth.LoginRequest;
import com.karakoc.ustam.requestmodels.auth.LoginResponse;
import com.karakoc.ustam.requestmodels.auth.RegisterRequest;
import com.karakoc.ustam.utilities.security.UserPrincipal;
import com.karakoc.ustam.managers.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
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
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        var response = authService.attemptRegister(request.getEmail(),request.getPassword(),request.getRole());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getMe")
    public ResponseEntity<Object>  getMe(@AuthenticationPrincipal UserPrincipal principal){
        var response = userService.getUserWithEmail(principal.getEmail());
        return ResponseEntity.ok(response);
    }


}
