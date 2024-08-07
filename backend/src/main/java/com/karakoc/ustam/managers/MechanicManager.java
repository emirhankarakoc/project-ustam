package com.karakoc.ustam.managers;

import com.karakoc.ustam.appointment.AppointmentRepository;
import com.karakoc.ustam.utilities.cloudinary.service.CloudinaryService;
import com.karakoc.ustam.utilities.exceptions.general.BadRequestException;
import com.karakoc.ustam.utilities.exceptions.general.NotfoundException;
import com.karakoc.ustam.utilities.exceptions.strings.ExceptionMessages;
import com.karakoc.ustam.utilities.security.WebSecurityConfig;
import com.karakoc.ustam.utilities.socketio.model.CardStatus;
import com.karakoc.ustam.utilities.socketio.model.IdCard;
import com.karakoc.ustam.utilities.socketio.model.IdCardRepository;
import com.karakoc.ustam.utilities.socketio.socket.SocketModule;
import com.karakoc.ustam.users.*;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.provinces.ProvinceRepository;
import com.karakoc.ustam.skills.Skill;
import com.karakoc.ustam.skills.SkillRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static com.karakoc.ustam.users.User.mechanicToDTO;

@Service
@AllArgsConstructor
public class MechanicManager implements MechanicService {
    private final UserRepository repository;
    private final ExceptionMessages messages;
    private final WebSecurityConfig webSecurityConfig;
    private final SocketModule socketModule;
    private final SkillRepository skillRepository;
    private final CloudinaryService cloudinaryService;
    private final ProvinceRepository provinceRepository;
    private final IdCardRepository idCardRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    @Transactional
    public MechanicDTO createMechanic(String email, String password) {
        //validations
        Optional<User> user1 =repository.findUserByEmail(email);
        if (user1.isPresent()){
            throw new BadRequestException(messages.getEMAIL_ADRESS_EXISTING_400());
        }
        //olusturma
        User mechanic = new User();
        mechanic.setId(UUID.randomUUID().toString());
        mechanic.setRole(Roles.ROLE_MECHANIC.toString());
        mechanic.setStatus(VerificationStatus.NOTHING);
        mechanic.setEmail(email);
        mechanic.setPassword(webSecurityConfig.passwordEncoder().encode(password));
        mechanic.setPoint(0);
        mechanic.setExtraInfo("Fill here.");
        mechanic.setPointCounter(0);
        mechanic.setReview(new ArrayList<>());
        mechanic.setSkills(new ArrayList<>());
        mechanic.setProvinces(new ArrayList<>());
        mechanic.setWhiteListedUserIds(new ArrayList<>());

        //db save islemi.
        repository.save(mechanic);
        socketModule.broadcastNewUser(mechanic.getId());
        return mechanicToDTO(mechanic);

    }

    @Override
    @Transactional
    public MechanicDTO setSkills(String userId,List<String> skills) {

        var user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.getSkills().clear();
        user.setSkills(new ArrayList<>());

        for (String skillId:skills) {
            Skill skill = skillRepository.findById(skillId).orElseThrow(()-> new NotfoundException(messages.getSKILL_NOT_FOUND_404()));
            user.getSkills().add(skill);

            skill.setMechanicCounter(skill.getMechanicCounter()+1);
            skillRepository.save(skill);
        }



        repository.save(user);
        return mechanicToDTO(user);
    }

    @Override
    @Transactional
    public MechanicDTO setProvinces(String userId, List<String> provinces) {
        var user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.getProvinces().clear();
        user.setProvinces(new ArrayList<>());
        for (String provinceId:provinces) {
            Province provinces1 = provinceRepository.findById(provinceId).orElseThrow(()-> new NotfoundException("Province not found."));
            user.getProvinces().add(provinces1);

            provinces1.setMechanicCounter(provinces1.getMechanicCounter()+1);
            provinceRepository.save(provinces1);
        }

        repository.save(user);
        return mechanicToDTO(user);
    }

    public MechanicDTO getMechanicWithId(String id){
        var mechanic = repository.findById(id).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        return mechanicToDTO(mechanic);
    }
    @Transactional
     public IdCard sendIdentifyCard(String userId, MultipartFile file) throws IOException {
        var user = repository.findUserById(userId).orElseThrow(() -> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        if (user.getStatus().equals(VerificationStatus.VERIFICATED)){
            throw new BadRequestException(messages.getALREADY_VERIFICATED());
        }
        Optional<IdCard> card1 = idCardRepository.findByUserId(userId);
        if (card1.isPresent()){
            idCardRepository.delete(card1.get());
            cloudinaryService.delete(card1.get().getImageCloudId());
        }
        try {
            Map<String, String> uploadResult = cloudinaryService.upload(file);
            String imageUrl = uploadResult.get("url");
            String cloudId = uploadResult.get("public_id");

            IdCard card = new IdCard();
            card.setId(UUID.randomUUID().toString());
            card.setUserId(user.getId());
            card.setImagePath(imageUrl);
            card.setImageCloudId(cloudId);
            card.setStatus(CardStatus.PENDING);
            user.setStatus(VerificationStatus.WAITING);
            idCardRepository.save(card);
            repository.save(user);
            socketModule.broadcastIdentifyCard(userId, imageUrl);
            return card;
        } catch (IOException e) {
            throw new BadRequestException("Failed to upload identify card");
        }

    }

    @Override
    public ResponseEntity<List<Skill>> getMySkills(String userId) {
        var user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
                List<Skill> skills = user.getSkills();
        return ResponseEntity.ok(skills);
    }
    @Override
    public ResponseEntity<List<Province>> getMyProvinces(String userId) {
        var user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        List<Province> provinces = user.getProvinces();
        return ResponseEntity.ok(provinces);
    }


}
