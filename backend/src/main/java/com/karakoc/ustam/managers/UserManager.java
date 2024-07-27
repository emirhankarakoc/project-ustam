package com.karakoc.ustam.managers;


import com.karakoc.ustam.appointment.*;
import com.karakoc.ustam.requestmodels.appointments.AllAppointmentsResponse;
import com.karakoc.ustam.requestmodels.appointments.AppointmentRequest;
import com.karakoc.ustam.utilities.exceptions.general.BadRequestException;
import com.karakoc.ustam.utilities.exceptions.general.ForbiddenException;
import com.karakoc.ustam.utilities.exceptions.general.NotfoundException;
import com.karakoc.ustam.utilities.exceptions.strings.ExceptionMessages;
import com.karakoc.ustam.utilities.security.WebSecurityConfig;
import com.karakoc.ustam.utilities.socketio.model.CardStatus;
import com.karakoc.ustam.utilities.socketio.model.IdCardRepository;
import com.karakoc.ustam.utilities.socketio.socket.SocketModule;
import com.karakoc.ustam.users.*;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.provinces.ProvinceRepository;
import com.karakoc.ustam.skills.Skill;
import com.karakoc.ustam.skills.SkillRepository;
import com.karakoc.ustam.verificationcodes.Code;
import com.karakoc.ustam.verificationcodes.CodeRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static com.karakoc.ustam.users.User.*;

@Service
@AllArgsConstructor
public class UserManager implements UserService {
    private final UserRepository repository;
    private final IdCardRepository idCardRepository;
    private final ExceptionMessages messages;
    private final WebSecurityConfig webSecurityConfig;
    private final ProvinceRepository provinceRepository;
    private final SocketModule socketModule;
    private final AdminService adminService;
    private final CodeRepository codeRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public UserDTO createUser(String email, String password) {
        //validations
        Optional<User> user1 =repository.findUserByEmail(email);
        if (user1.isPresent()){
            throw new BadRequestException(messages.getEMAIL_ADRESS_EXISTING_400());
        }
        //olusturma
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setRole(Roles.ROLE_USER.toString());

        user.setStatus(VerificationStatus.NOTHING);
        user.setEmail(email);
        user.setPassword(webSecurityConfig.passwordEncoder().encode(password));
        user.setPoint(0);
        user.setExtraInfo("");
        user.setPointCounter(0);
        user.setReview(new ArrayList<>());
        user.setSkills(new ArrayList<>());
        user.setProvinces(new ArrayList<>());
        user.setWhiteListedUserIds(new ArrayList<>());

        //db save islemi.
        repository.save(user);
        socketModule.broadcastNewUser(user.getId());
        return userToDTO(user);
    }

    @Override
    public UserDTO addPhoneNumber(String userId, String phoneNumber) {
        Optional<User> copy = repository.findUserByPhoneNumber(phoneNumber);
        if (copy.isPresent() && !copy.get().getId().equalsIgnoreCase(userId) ) {
                throw new BadRequestException("This phone number already using.");
        }
        var user = repository.findById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setPhoneNumber(phoneNumber);
        repository.save(user);
        adminService.sendVerificationCodeToPhoneNumber(phoneNumber);
        return  userToDTO(user);
    }

     public void sendVerificationCodeToPhoneNumber(String phonenumber) {
        adminService.sendVerificationCodeToPhoneNumber(phonenumber);
        //?
    }

    @Override
    public void verificatePhoneNumberWithVerificationCode(String userId, String verificationCode) {

        User user = repository.findById(userId).get();
        Optional<Code> code = codeRepository.findByUserId(userId);
        if (verificationCode.equalsIgnoreCase(code.get().getValue())){
            // matches
            user.setStatus(VerificationStatus.VERIFICATED);
            repository.save(user);
        }
        else{
            //false code
            throw new BadRequestException("Wrong verification code.");
        }

    }

    @Override
    public List<MechanicDTO> getMechanicsForGivenSkill(String skillId) {
        List<User> mechanicsWithGivenSkill = repository.findAllBySkillId(skillId);
        return  mechanicsToDTO(mechanicsWithGivenSkill);
    }

    @Override
    public List<Skill> seeAllSkills() {
        List<Skill> skills =skillRepository.findAll();
        for (Skill skill : skills){
            skill.setMechanicCounter(userRepository.findUsersBySkillId(skill.getId()).size());
        }
        skillRepository.saveAll(skills);
        return skills;
    }

    @Override
    public List<Province> seeAllProvinces() {
        List<Province> provinces = provinceRepository.findAll();
        for (Province province: provinces){
            province.setMechanicCounter(userRepository.findUsersByProvinceId(province.getId()).size());
        }
        provinceRepository.saveAll(provinces);
        return provinces;
    }

    @Override
    public ResponseEntity<Object> getUserWithEmail(String userEmail) {
        var user = repository.findUserByEmail(userEmail).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        String role = user.getRole();
        if (role.equalsIgnoreCase(Roles.ROLE_MECHANIC.toString())){
            return ResponseEntity.ok(mechanicToDTO(user));
        }
        else if (role.equalsIgnoreCase(Roles.ROLE_USER.toString())){
            return ResponseEntity.ok(userToDTO(user));
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something crashed we didn't expect, sorry.");

        }
    }

    @Override
    public Optional getUserWithId(String userId) {

        var user = repository.findUserById(userId).orElseThrow(() -> new NotfoundException(messages.getUSER_NOT_FOUND_404()));

        if (user.getRole().equalsIgnoreCase(Roles.ROLE_USER.toString())) {

            return Optional.of(userToDTO(user));

        } else if (user.getRole().equalsIgnoreCase(Roles.ROLE_MECHANIC.toString())) {

            return Optional.of(mechanicToDTO(user));
        }
        //BadRequestException is custom exception handler.
        else throw new BadRequestException("Something crashed. Try again.");
    }

    public UserDTO switchUserType(String userId) {
        var user = repository.findUserById(userId).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setRole(Roles.ROLE_MECHANIC.toString());
        repository.save(user);
        return userToDTO(user);
    }



    @Override
    @Transactional
    public MechanicDTO acceptIdentifyCard(String cardId) {
        var card = idCardRepository.findById(cardId).orElseThrow(()-> new NotfoundException(messages.getID_CARD_NOT_FOUND_404()));
        card.setStatus(CardStatus.ALLOWED);
        idCardRepository.save(card);
        var user = repository.findById(card.getUserId()).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setStatus(VerificationStatus.VERIFICATED);
        userRepository.save(user);

        socketModule.sendMessageToUser(card.getUserId(),messages.getSOCKET_IDCARD_ACCEPTED());
        return mechanicToDTO(user);

    }

    @Override
    public MechanicDTO rejectIdentifyCard(String cardId) throws IOException {

        var card = idCardRepository.findById(cardId).orElseThrow(()-> new NotfoundException(messages.getID_CARD_NOT_FOUND_404()));
        var user = repository.findUserById(card.getUserId()).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        user.setStatus(VerificationStatus.REJECTED);
        repository.save(user);
        socketModule.sendMessageToUser(card.getUserId(),messages.getSOCKET_IDCARD_REJECTED());
        return mechanicToDTO(user);
    }
    @Transactional
    public Appointment createNewAppointment(String senderId, AppointmentRequest request) {
        var sender = repository.findById(senderId).orElseThrow(
                ()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        var receiver = repository.findUserById(request.getReceiverId()).orElseThrow(
                ()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        Appointment ap = new Appointment();
        ap.setId(UUID.randomUUID().toString());
        ap.setDate(LocalDate.now());
        ap.setSenderId(sender.getId());
        ap.setReceiverId(receiver.getId());
        ap.setPrice(request.getPrice());
        ap.setSenderAnswer(AppointmentAnswers.ACCEPT);
        ap.setReceiverAnswer(AppointmentAnswers.NOTHING4NOW);
        ap.setStatus(AppointmentStatus.WAITING);
        appointmentRepository.save(ap);
        //birbirlerinin appointmentlarina birbirlerini ekleyecegiz. bu waiting durumu approved olursa , ikisini de birbirinin whitelistine ekleyecegiz.
        sender.getAppointments().add(ap);
        receiver.getAppointments().add(ap);
        repository.saveAll(List.of(sender,receiver));

        return ap;


    }

    @Override
    public Appointment getAppointmentWithId(String userId, String appointmentId) {
        var app = appointmentRepository.findById(appointmentId).orElseThrow(()->new NotfoundException(messages.getAPPOINTMENT_NOT_FOUND_404()));
        var user = userRepository.findUserById(userId).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));

        if (Objects.equals(app.getReceiverId(), user.getId()) || Objects.equals(app.getSenderId(), user.getId())){
            return app;
        }
        else {throw new ForbiddenException("You cant see this appointment right now.");
        }
    }

    @Override
    @Transactional
    public Appointment acceptAppointmentWithId(String principalId, String appointmentId) {
        // Randevuyu bul veya hata fırlat
        var app = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new NotfoundException(messages.getAPPOINTMENT_NOT_FOUND_404()));


        // Alıcıyı bul veya hata fırlat
        var receiver = userRepository.findUserById(app.getReceiverId())
                .orElseThrow(() -> new NotfoundException(messages.getUSER_NOT_FOUND_404()));

        if (app.getReceiverId().equals(receiver.getId())){

            app.setReceiverAnswer(AppointmentAnswers.ACCEPT);
            app.setStatus(AppointmentStatus.DONE);
            appointmentRepository.save(app);

            User sender2 = userRepository.findUserById(app.getSenderId()).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));
            User receiver2 = userRepository.findUserById(app.getReceiverId()).orElseThrow(()->new NotfoundException(messages.getUSER_NOT_FOUND_404()));

            if (!sender2.getWhiteListedUserIds().contains(receiver2.getId())) {
                sender2.getWhiteListedUserIds().add(receiver2.getId());
            }
            if (!receiver2.getWhiteListedUserIds().contains(sender2.getId())){
                receiver2.getWhiteListedUserIds().add(sender2.getId());
            }
            sender2.getAppointments().add(app);
            receiver2.getAppointments().add(app);
            userRepository.saveAll(List.of(sender2,receiver2));


            return app;
        }
        else {
            throw new ForbiddenException("You cant see this appointment right now.");
        }
    }


    @Override
    public AllAppointmentsResponse getAllAppointmentsWithGivenUserId(String userId) {
        List<Appointment> sended = appointmentRepository.findAllBySenderId(userId);
        List<Appointment> received = appointmentRepository.findAllByReceiverId(userId);
        AllAppointmentsResponse response = new AllAppointmentsResponse();
        response.setSended(new ArrayList<>());
        response.setReceived(new ArrayList<>());
        response.setSended(sended);
        response.setReceived(received);
        return response;
    }

    @Override
    public ResponseEntity<List<String>> getUserWhitelistFromUserId(String userId) {
        var user = repository.findUserById(userId).orElseThrow(()-> new NotfoundException(messages.getUSER_NOT_FOUND_404()));
        return ResponseEntity.ok(user.getWhiteListedUserIds());
    }

    @Override
    public ResponseEntity<List<MechanicDTO>> getAllmechanicsFromGivenSkillIdAndProvinceId(String skillId, String provinceId) {
        // Beceri ve il kimliklerine göre kullanıcıları filtreleme
        List<User> usersWithSkill = userRepository.findUsersBySkillId(skillId);
        List<User> usersWithProvince = userRepository.findUsersByProvinceId(provinceId);

        // Ortak kullanıcıları bulma (hem beceri hem de il bilgisine sahip)
        usersWithSkill.retainAll(usersWithProvince);

        // Kullanıcıları DTO'ya dönüştürme
        return ResponseEntity.ok(User.mechanicsToDTO(usersWithSkill));

    }
}
