package com.karakoc.ustam.controllers;


import com.karakoc.ustam.users.MechanicDTO;
import com.karakoc.ustam.users.UserDTO;
import com.karakoc.ustam.utilities.security.UserPrincipal;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.skills.Skill;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@Tag(name = "USER CONTROLLER")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final MechanicService mechanicService;

    @PostMapping("/add-phone-number")
    public UserDTO addPhoneNumber(@AuthenticationPrincipal UserPrincipal principal, @RequestBody String phoneNumber){
        //dont remove here. verificationcode comes with {"phoneNumber":"value"}, so we need to substring for just value.
        String phoneNumber2 = phoneNumber.substring(16,phoneNumber.length()-2);

        return userService.addPhoneNumber(principal.getUserId(),phoneNumber2);
    }

    @PostMapping("/verificate-phone-number")
    public ResponseEntity<String> verificatePhoneNumberWithVerificationCode(@AuthenticationPrincipal UserPrincipal principal, @RequestBody String verificationCode){
        //don't remove here. verificationcode comes with {"c":"value"}, so we need to substring for just value.
        String verify = verificationCode.substring(6,verificationCode.length()-2);

        userService.verificatePhoneNumberWithVerificationCode(principal.getUserId(), verify);
        return ResponseEntity.ok("Congratilations. You verified your number.");
    }

    @GetMapping("/get/mechanics/{userId}")
    public MechanicDTO getMechanicWithUserId(@PathVariable String userId){
        return mechanicService.getMechanicWithId(userId);
    }

    @GetMapping("/skills")
    public List<Skill> getAllSkills(){
        return userService.seeAllSkills();
    }
    @GetMapping("/provinces")
    public List<Province> getAllProvinces(){
        return userService.seeAllProvinces();
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Object> getUserForUsers(@PathVariable String userId){
        var user = userService.getUserWithId(userId);
        //this method can return UserDTO or MechanicDTO
        return ResponseEntity.ok(user);
    }

    @GetMapping("/search/mechanic/{skillId}")
    public List<MechanicDTO> getMechanicsForGivenSkill(@PathVariable String skillId){
        return userService.getMechanicsForGivenSkill(skillId);
    }
    @GetMapping("/whitelist")
    public ResponseEntity<List<String>> getUserWhitelistFromUserId(@AuthenticationPrincipal UserPrincipal principal){
        var usersWhitelist = userService.getUserWhitelistFromUserId(principal.getUserId());
        return usersWhitelist;
    }

    @GetMapping("/search/{skillId}/{provinceId}")
    public List<MechanicDTO> getAllmechanicsFromGivenSkillIdAndProvinceId(@PathVariable String skillId, @PathVariable String provinceId){
        return userService.getAllmechanicsFromGivenSkillIdAndProvinceId(skillId,provinceId);
    }

}
