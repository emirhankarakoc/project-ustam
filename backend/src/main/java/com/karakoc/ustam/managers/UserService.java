package com.karakoc.ustam.managers;


import com.karakoc.ustam.requestmodels.appointments.AllAppointmentsResponse;
import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.requestmodels.appointments.AppointmentRequest;
import com.karakoc.ustam.users.MechanicDTO;
import com.karakoc.ustam.users.UserDTO;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.skills.Skill;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO addPhoneNumber(String userId,String phonenumber);
    void sendVerificationCodeToPhoneNumber(String phonenumber);
    void verificatePhoneNumberWithVerificationCode(String userId, String verificationCode);
    List<MechanicDTO> getMechanicsForGivenSkill(String skillname);
    ResponseEntity<Object> getUserWithEmail(String userEmail);
    Optional getUserWithId(String userId);
    UserDTO switchUserType(String userId);
    MechanicDTO acceptIdentifyCard(String cardId);
    MechanicDTO rejectIdentifyCard(String cardId) throws IOException;
    List<Skill> seeAllSkills();
    List<Province> seeAllProvinces();
    Appointment createNewAppointment(String senderId,AppointmentRequest request);
    Appointment getAppointmentWithId(String userId,String appointmentId);

    Appointment acceptAppointmentWithId(String userId,String appointmentId);

    AllAppointmentsResponse getAllAppointmentsWithGivenUserId(String userId);

    ResponseEntity<List<String>> getUserWhitelistFromUserId(String userId);

    ResponseEntity<List<MechanicDTO>> getAllmechanicsFromGivenSkillIdAndProvinceId(String skillId,String provinceId);

}
