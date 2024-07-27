package com.karakoc.ustam.controllers;


import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.appointment.AppointmentRequest;
import com.karakoc.ustam.exceptions.general.ForbiddenException;
import com.karakoc.ustam.security.UserPrincipal;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.user.MechanicDTO;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/mechanics")
@RestController
@Tag(name = "MECHANIC CONTROLLER")
@AllArgsConstructor
public class MechanicController {
    private final UserService userService;
    private final MechanicService mechanicService;
    @PostMapping(value = "/send-id-card", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public IdCard sendIdentifyCard(@AuthenticationPrincipal UserPrincipal principal,
                                   @RequestPart("multipartFile") MultipartFile file) throws IOException {

        return mechanicService.sendIdentifyCard(principal.getUserId(), file);
    }
    @PutMapping("/add-skills")
    public MechanicDTO setMechanicSkills(@AuthenticationPrincipal UserPrincipal principal,@RequestBody List<String> skills){
        return mechanicService.setSkills(principal.getUserId(),skills);
    }


    @GetMapping("/my-skills")
    public Optional getMySkills(@AuthenticationPrincipal UserPrincipal principal){
        return mechanicService.getMySkills(principal.getUserId());
    }



    @PutMapping("/add-provinces")
    public MechanicDTO setMechanicProvinces(@AuthenticationPrincipal UserPrincipal principal,@RequestBody List<String> provinces){
        return mechanicService.setProvinces(principal.getUserId(),provinces);
    }


    @GetMapping("/my-provinces")
    public Optional getMyProvinces(@AuthenticationPrincipal UserPrincipal principal){
        return mechanicService.getMyProvinces(principal.getUserId());
    }



}
