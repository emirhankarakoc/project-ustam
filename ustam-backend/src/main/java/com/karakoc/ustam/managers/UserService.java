package com.karakoc.ustam.managers;


import com.karakoc.ustam.appointment.AllAppointmentsResponse;
import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.appointment.AppointmentRepository;
import com.karakoc.ustam.appointment.AppointmentRequest;
import com.karakoc.ustam.user.MechanicDTO;
import com.karakoc.ustam.user.UserDTO;
import com.karakoc.ustam.user.province.Province;
import com.karakoc.ustam.user.skill.Skill;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(String email, String password);
    UserDTO addPhoneNumber(String userId,String phonenumber);
    void sendVerificationCodeToPhoneNumber(String phonenumber);
    void verificatePhoneNumberWithVerificationCode(String userId, String verificationCode);
    List<MechanicDTO> getMechanicsForGivenSkill(String skillname);
    Optional getUserWithEmail(String userEmail);
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

    List<Optional> getUserWhitelistFromUserId(String userId);

    List<MechanicDTO> getAllmechanicsFromGivenSkillIdAndProvinceId(String skillId,String provinceId);

}
