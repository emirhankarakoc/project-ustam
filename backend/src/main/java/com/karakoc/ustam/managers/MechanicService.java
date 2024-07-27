package com.karakoc.ustam.managers;

import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.skills.Skill;
import com.karakoc.ustam.utilities.socketio.model.IdCard;
import com.karakoc.ustam.users.MechanicDTO;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface MechanicService {
    MechanicDTO createMechanic(String email, String password);
    MechanicDTO getMechanicWithId(String id);
    IdCard sendIdentifyCard(String userId, MultipartFile file) throws IOException;
    MechanicDTO setSkills(String userId,List<String> skills);
    MechanicDTO setProvinces(String userId,List<String> provinces);

    ResponseEntity<List<Skill>> getMySkills(String userId);
    ResponseEntity<List<Province>> getMyProvinces(String userId);
}
