package com.karakoc.ustam.managers;

import com.karakoc.ustam.utilities.socketio.model.IdCard;
import com.karakoc.ustam.users.MechanicDTO;
import com.karakoc.ustam.users.User;
import com.karakoc.ustam.users.UserDTO;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.skills.Skill;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    List<UserDTO> getUsers();
    List<MechanicDTO> getMechanics();
    void sendVerificationCodeToPhoneNumber(String phoneNumber);
    Skill createSkill(String name);
    Province createNewProvince(String name);
    List<User> getAllUsersForAdmin();
    List<IdCard> seeAllIdCards();
    List<IdCard> seeAllVerifiedIdCards();
    List<IdCard> seeAllPendingIdCards();
    ResponseEntity<Object> getUserForInspecting(String userId);
    ResponseEntity<Object> deleteSkill(String id);
    ResponseEntity<Object> deleteProvince(String id);
}
