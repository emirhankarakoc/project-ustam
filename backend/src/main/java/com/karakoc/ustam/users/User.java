package com.karakoc.ustam.users;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.karakoc.ustam.appointment.Appointment;
import com.karakoc.ustam.provinces.Province;
import com.karakoc.ustam.rewiews.Review;
import com.karakoc.ustam.skills.Skill;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    private String id;
    private String email;
    @JsonIgnore
    private String password;
    private String role;
    private String phoneNumber;
    private double point;
    private int pointCounter;
    @Enumerated
    private VerificationStatus status;
    private String extraInfo;
    @OneToMany
    @JoinColumn(name = "provinceId")
    private List<Province> provinces;


    @OneToMany
    @JoinColumn(name = "skillId")
    private List<Skill> skills;

    @ElementCollection
    private List<String> whiteListedUserIds;
    @OneToMany
    @JoinColumn(name = "appointmentId")
    private List<Appointment> appointments;

    @OneToMany
    @JoinColumn(name = "reviewId")
    private List<Review> review;


    public static UserDTO userToDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .phoneNumber(user.getPhoneNumber())

                .whiteListedUserIds(user.getWhiteListedUserIds())
                .status(user.getStatus())
                .build();
    }
    public static List<UserDTO> usersToDTO(List<User> userliust){
        List<UserDTO> dtoList = new ArrayList<>();
        for(User user: userliust){
            dtoList.add(userToDTO(user));
        }
        return dtoList;
    }
    public static MechanicDTO mechanicToDTO(User user){
        var dto = new MechanicDTO();
        dto.setId(user.getId());
        dto.setRole(user.getRole());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setPoint(user.getPoint());
        dto.setPointCounter(user.getPointCounter());
        dto.setStatus(user.getStatus());
        dto.setExtraInfo(user.getExtraInfo());
        dto.setReviews(user.getReview());
        dto.setSkills(user.getSkills());

        dto.setWhiteListedUserIds(user.getWhiteListedUserIds());
        return dto;
    }

    public static List<MechanicDTO> mechanicsToDTO(List<User> users){
        List<MechanicDTO> dtoList = new ArrayList<>();
        for(User user1 : users){
            dtoList.add(mechanicToDTO(user1));
        }
        return dtoList;
    }
}
