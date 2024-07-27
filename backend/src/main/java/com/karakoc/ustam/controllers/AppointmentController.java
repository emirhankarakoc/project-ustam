package com.karakoc.ustam.controllers;


import com.karakoc.ustam.requestmodels.appointments.AllAppointmentsResponse;
import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.requestmodels.appointments.AppointmentRequest;
import com.karakoc.ustam.managers.MechanicService;
import com.karakoc.ustam.managers.UserService;
import com.karakoc.ustam.utilities.security.UserPrincipal;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
@Tag(name = "Appointment Controller")
@AllArgsConstructor
public class AppointmentController {
    private final MechanicService mechanicService;
    private final UserService userService;


    @PostMapping()
    public Appointment createNewAppointment(@AuthenticationPrincipal UserPrincipal principal , @RequestBody AppointmentRequest request){
            return userService.createNewAppointment(principal.getUserId(),request);

    }
    @PutMapping("/accept/{appointmentId}")
    public Appointment acceptAppointmentWithId(@AuthenticationPrincipal UserPrincipal principal, @PathVariable String appointmentId){
        return userService.acceptAppointmentWithId(principal.getUserId(),appointmentId);
    }
    @GetMapping("/all")
    public AllAppointmentsResponse getMyAppointments(@AuthenticationPrincipal UserPrincipal principal){
        return userService.getAllAppointmentsWithGivenUserId(principal.getUserId());
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentWithId(@AuthenticationPrincipal UserPrincipal principal, @PathVariable String id){
        return userService.getAppointmentWithId(principal.getUserId(),id);
    }
}
