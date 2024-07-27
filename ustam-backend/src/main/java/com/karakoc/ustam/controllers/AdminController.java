package com.karakoc.ustam.controllers;


import com.karakoc.ustam.managers.AdminService;
import com.karakoc.ustam.managers.UserService;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.user.MechanicDTO;
import com.karakoc.ustam.user.User;
import com.karakoc.ustam.user.UserDTO;
import com.karakoc.ustam.user.province.Province;
import com.karakoc.ustam.user.skill.Skill;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@Tag(name = "ADMIN CONTROLLER")

@AllArgsConstructor
public class AdminController {
    private final UserService userService;
    private final AdminService adminService;
    @PostMapping("/accept/{cardId}")
    @Operation(summary = "Sexsiyyet vesiqesini onaylama")
    public MechanicDTO acceptIdentifyCard(@PathVariable String cardId) {
        return userService.acceptIdentifyCard(cardId);
    }
    @PostMapping("/reject/{cardId}")
    @Operation(summary = "Sexsiyyet vesiqesini reddetme")
    public MechanicDTO rejectIdentifyCard(@PathVariable String cardId) throws IOException {
        return userService.rejectIdentifyCard(cardId);
    }

    @PostMapping("/skill")
    @Operation(summary = "Tamir kategorisi eklemek")
    public Skill postNewSkill(@RequestParam String name){
        return adminService.createSkill(name);
    }
    @PostMapping("/province")
    @Operation(summary = "Ilce eklemek")
    public Province postNewProvince(@RequestParam String name){
        return adminService.createNewProvince(name);
    }
    @GetMapping("/all-users")
    @Operation(summary = "Kayitli olan HERKESI getiren endpoint.")
    public List<User> getAllUsersForAdmin(){
        return adminService.getAllUsersForAdmin();
    }

    @GetMapping("/only-users")
    public List<UserDTO> getUsers(){
        return adminService.getUsers();
    }
    @GetMapping("/only-mechanics")
    public List<MechanicDTO> getMechanics(){
        return adminService.getMechanics();
    }

    @GetMapping("/inspect/{userId}")
    public Optional getUserForInspecting(@PathVariable String userId){
        return adminService.getUserForInspecting(userId);
    }


    @GetMapping("/idcard-all")
    public List<IdCard> getAllIdCardsForAdmin() {
    return adminService.seeAllIdCards();
    }
    @GetMapping("/idcard-verified")
    public List<IdCard> getAllVerifiedIdCardsForAdmin() {
        return adminService.seeAllVerifiedIdCards();
    }
    @GetMapping("/ifcard-pending")
    public List<IdCard> getAllPendingIdCardsForAdmin() {
        return adminService.seeAllPendingIdCards();
    }


    @DeleteMapping("/skills/{id}")
    public Optional deleteSkill(@PathVariable String id){
        return adminService.deleteSkill(id);
    }

    @DeleteMapping("/provinces/{id}")
    public Optional deleteProvince(@PathVariable String id){
        return adminService.deleteProvince(id);
    }

}





