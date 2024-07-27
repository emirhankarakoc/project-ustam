package com.karakoc.ustam.account;

import com.karakoc.ustam.requestmodels.auth.LoginResponse;
import com.karakoc.ustam.utilities.exceptions.general.BadRequestException;
import com.karakoc.ustam.utilities.exceptions.general.ForbiddenException;
import com.karakoc.ustam.utilities.security.TokenManager;
import com.karakoc.ustam.utilities.security.UserPrincipal;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import com.karakoc.ustam.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service

@RequiredArgsConstructor
public class AuthManager implements AuthService{
    private final TokenManager tokenManager;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final MechanicService mechanicService;

    public LoginResponse attemptLogin(String email, String password) {
       try{
           var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
           SecurityContextHolder.getContext().setAuthentication(authentication);

           var principal = (UserPrincipal) authentication.getPrincipal();
           var roles = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

           var token = tokenManager.issue(principal.getUserId(), principal.getEmail(), roles);
           var user = userRepository.findUserById(principal.getUserId()).get();
           return LoginResponse.builder()
                   .accessToken(token)
                   .userRole(roles.get(0))
                   .status(user.getStatus())

                   .build();
       }
       catch (Exception e){
           throw new ForbiddenException("Wrong email or password");
           //i found the error, in 24. row but i cant fixed. so i found this solution. thanks.
       }
    }


    public ResponseEntity<Object> attemptRegister(String email, String password, AuthType type){
        if (type.equals(AuthType.USER)) {
            return ResponseEntity.ok(userService.createUser(email, password));
        }
        else if (type.equals(AuthType.MECHANIC)){
            return ResponseEntity.ok(mechanicService.createMechanic(email,password));
        }
        else{
            throw new BadRequestException("Something crashed. Please try again later.");
            //same as ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something ...");
        }
    }
}
