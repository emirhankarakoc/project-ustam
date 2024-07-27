package com.karakoc.ustam.controllers;


import com.karakoc.ustam.appointment.AllAppointmentsResponse;
import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.appointment.AppointmentRequest;
import com.karakoc.ustam.exceptions.general.ForbiddenException;
import com.karakoc.ustam.security.UserPrincipal;
import com.karakoc.ustam.user.MechanicDTO;
import com.karakoc.ustam.user.UserDTO;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import com.karakoc.ustam.user.province.Province;
import com.karakoc.ustam.user.skill.Skill;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@Tag(name = "USER CONTROLLER")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final MechanicService mechanicService;

    @PostMapping("/add-phone-number")
    public UserDTO addPhoneNumber(@AuthenticationPrincipal UserPrincipal principal,@RequestBody String phoneNumber){
        //dont remove here. verificationcode comes with {"phoneNumber":"value"}, so we need to substring for just value.
        String phoneNumber2 = phoneNumber.substring(16,phoneNumber.length()-2);

        return userService.addPhoneNumber(principal.getUserId(),phoneNumber2);
    }

    @PostMapping("/verificate-phone-number")
    public ResponseEntity verificatePhoneNumberWithVerificationCode(@AuthenticationPrincipal UserPrincipal principal, @RequestBody String verificationCode){
        //dont remove here. verificationcode comes with {"c":"value"}, so we need to substring for just value.
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
    public Optional getUserForUsers(@PathVariable String userId){
        return userService.getUserWithId(userId);
    }

    @GetMapping("/search/mechanic/{skillId}")
    public List<MechanicDTO> getMechanicsForGivenSkill(@PathVariable String skillId){
        return userService.getMechanicsForGivenSkill(skillId);
    }
    @GetMapping("/whitelist")
    public List<Optional> getUserWhitelistFromUserId(@AuthenticationPrincipal UserPrincipal principal){
        return userService.getUserWhitelistFromUserId(principal.getUserId());
    }

    @GetMapping("/search/{skillId}/{provinceId}")
    public List<MechanicDTO> getAllmechanicsFromGivenSkillIdAndProvinceId(@PathVariable String skillId, @PathVariable String provinceId){
        return userService.getAllmechanicsFromGivenSkillIdAndProvinceId(skillId,provinceId);
    }

}
