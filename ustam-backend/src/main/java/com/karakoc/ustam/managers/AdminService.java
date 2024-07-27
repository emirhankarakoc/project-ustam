package com.karakoc.ustam.managers;

import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.user.MechanicDTO;
import com.karakoc.ustam.user.User;
import com.karakoc.ustam.user.UserDTO;
import com.karakoc.ustam.user.province.Province;
import com.karakoc.ustam.user.skill.Skill;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    void verifyIdentifyCard();
    List<UserDTO> getUsers();
    List<MechanicDTO> getMechanics();
    void sendVerificationCodeToPhoneNumber(String phoneNumber);
    Skill createSkill(String name);
    Province createNewProvince(String name);
    List<User> getAllUsersForAdmin();
    List<IdCard> seeAllIdCards();
    List<IdCard> seeAllVerifiedIdCards();
    List<IdCard> seeAllPendingIdCards();
    Optional getUserForInspecting(String userId);
    Optional deleteSkill(String id);
    Optional deleteProvince(String id);
}
