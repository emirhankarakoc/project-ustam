package com.karakoc.ustam.controllers;

import com.karakoc.ustam.managers.AdminService;
import com.karakoc.ustam.security.UserPrincipal;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.user.*;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/hello")
@RestController
@Tag(name = "hello!")
@AllArgsConstructor
public class HelloController {
    private final UserRepository repository;
    private final UserService userService;
    private final MechanicService mechanicService;
    private final AdminService adminService;
    @GetMapping("/test-endpoint")
    public String hello(){
        return "Hello world!";
    }

    @PutMapping("/change-user-type/toAdmin")
    public User beAdmin(@AuthenticationPrincipal UserPrincipal principal){
        var user = repository.findUserById(principal.getUserId()).get();
        user.setRole(Roles.ROLE_ADMIN.toString());
        return repository.save(user);
    }
    @PutMapping("/switch-user-type/mechanic")
    public UserDTO switchUserType(@AuthenticationPrincipal UserPrincipal principal){
        return userService.switchUserType(principal.getUserId());
    }

    @GetMapping("/user/{userId}")
    public Optional getUserWithId(@PathVariable String userId){
        return userService.getUserWithId(userId);
    }

    @GetMapping("/mechanic/{userId}")
    public MechanicDTO getMechanicWithId(@PathVariable String userId){
        return mechanicService.getMechanicWithId(userId);
    }
    @GetMapping("/idcard-all")
    public List<IdCard> getAllIdCardsForAdmin() {
        return adminService.seeAllIdCards();
    }

}