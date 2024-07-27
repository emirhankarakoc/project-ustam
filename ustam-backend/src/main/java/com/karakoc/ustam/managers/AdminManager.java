package com.karakoc.ustam.managers;

import com.karakoc.ustam.exceptions.general.BadRequestException;
import com.karakoc.ustam.exceptions.general.ForbiddenException;
import com.karakoc.ustam.exceptions.general.NotfoundException;
import com.karakoc.ustam.exceptions.strings.ExceptionMessages;
import com.karakoc.ustam.socketio.model.CardStatus;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.socketio.model.IdCardRepository;
import com.karakoc.ustam.user.*;
import com.karakoc.ustam.user.province.Province;
import com.karakoc.ustam.user.province.ProvinceRepository;
import com.karakoc.ustam.user.skill.Skill;
import com.karakoc.ustam.user.skill.SkillRepository;
import com.karakoc.ustam.user.verificationCodes.Code;
import com.karakoc.ustam.user.verificationCodes.CodeRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.karakoc.ustam.user.User.mechanicsToDTO;
import static com.karakoc.ustam.user.User.usersToDTO;

@Service
@AllArgsConstructor
public class AdminManager implements AdminService {
    private final UserRepository repository;
    private final ExceptionMessages messages;
    private final CodeRepository codeRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final IdCardRepository idCardRepository;
    private final ProvinceRepository provinceRepository;

    @Override
    public void verifyIdentifyCard() {

    }

    @Override
    public List<UserDTO> getUsers() {
        List<User> users = repository.findAllByRole(Roles.ROLE_USER.toString());

        return usersToDTO(users);
    }

    @Override
    public List<MechanicDTO> getMechanics() {
        List<User> users = repository.findAllByRole(Roles.ROLE_MECHANIC.toString());

        return mechanicsToDTO(users);
    }

    @Override
    public void sendVerificationCodeToPhoneNumber(String phoneNumber) {
        var user = repository.findUserByPhoneNumber(phoneNumber).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Optional<Code> coide = codeRepository.findByUserId(user.getId());
        if (coide.isPresent()){
            codeRepository.delete(coide.get());
        }

        //sms service implementation.
        Code code = new Code();
        code.setId(UUID.randomUUID().toString());
        code.setCreated(LocalDateTime.now());
        code.setExpires(LocalDateTime.now().plusMinutes(2));
        code.setUserId(user.getId());
        //for now...
        code.setValue("123456");
        codeRepository.save(code);
        //this method must be implemented after sms implementation.
        //sendMessage(phonenumber,code.getValue());

    }

    @Override
    public Optional getUserForInspecting(String userId) {
        var user = repository.findUserById(userId).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        if (user.getRole().equals(Roles.ROLE_MECHANIC.toString())){
            Optional<IdCard> card = idCardRepository.findByUserId(userId);
            if (card.isPresent()) {
                return Optional.of(List.of(user, card));
            }
            if (card.isEmpty()){
                return Optional.of(List.of(user));

            }
        }
        else if (user.getRole().equals(Roles.ROLE_USER.toString())){
                return Optional.of(user);

        }
        else if (user.getRole().equals(Roles.ROLE_ADMIN.toString())){
            return Optional.of("?");
        }
        throw new ForbiddenException("Go login.");
    }

    public Skill createSkill(String name){
        Skill skill = new Skill();
        skill.setId(UUID.randomUUID().toString());
        skill.setName(name.toUpperCase());
        return skillRepository.save(skill);
    }

    public List<User> getAllUsersForAdmin(){
        return userRepository.findAll();
    }

    @Override
    public List<IdCard> seeAllIdCards() {
        return idCardRepository.findAll();
    }

    @Override
    public List<IdCard> seeAllVerifiedIdCards() {
        return idCardRepository.findAllByStatus(CardStatus.ALLOWED);
    }

    @Override
    public List<IdCard> seeAllPendingIdCards() {
        return idCardRepository.findAllByStatus(CardStatus.PENDING);
    }

    @Override
    public Province createNewProvince(String name) {
        Province province = new Province();
        province.setId(UUID.randomUUID().toString());
        province.setName(name.toUpperCase());
        return provinceRepository.save(province);
    }

    @Override
    @Transactional
    public Optional deleteSkill(String id) {


        Skill skill = skillRepository.findById(id).orElseThrow(()-> new NotfoundException("Skill not found."));

        List<User> skillOwners = userRepository.findAllBySkillId(skill.getId());
        for (User user: skillOwners){
            user.getSkills().remove(skill);
        }
        userRepository.saveAll(skillOwners); // Tüm kullanıcıları topluca kaydet


        skillRepository.delete(skill);
        return Optional.of("Deleted " + skill.toString());
    }

    @Transactional
    public Optional deleteProvince(String id){
        Province province = provinceRepository.findById(id).orElseThrow(()-> new NotfoundException("Province not found."));
        List<User> provinceOwners = userRepository.findUsersByProvinceId(province.getId());
        for (User user: provinceOwners){
            user.getProvinces().remove(province);
        }
        userRepository.saveAll(provinceOwners);
        provinceRepository.delete(province);
        return Optional.of("Deleted "+province.toString());
    }
}
