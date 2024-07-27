package com.karakoc.ustam.managers;

import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.appointment.AppointmentRequest;
import com.karakoc.ustam.security.UserPrincipal;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.user.MechanicDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MechanicService {
    MechanicDTO createMechanic(String email, String password);
    void sendBroadcastToAdminsForNewMechanic();
    void sendBroadcastToAdminsForNewIdentifyCard();
    void sendIdentifyCardForVerificationToAdmins();
    MechanicDTO getMechanicWithId(String id);
    IdCard sendIdentifyCard(String userId, MultipartFile file) throws IOException;
    MechanicDTO setSkills(String userId,List<String> skills);
    MechanicDTO setProvinces(String userId,List<String> provinces);

    Optional getMySkills(String userId);
    Optional getMyProvinces(String userId);
}
