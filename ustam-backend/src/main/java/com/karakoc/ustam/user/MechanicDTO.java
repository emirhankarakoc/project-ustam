package com.karakoc.ustam.user;

import com.karakoc.ustam.user.rewiew.Review;
import com.karakoc.ustam.user.skill.Skill;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class MechanicDTO {
        private String id;
        private String email;
        private String role;
        private String phoneNumber;
        private double point_M;
        private int pointCounter_M;
        private VerificationStatus status;
        private String extraInfo_M;
        private List<Skill> skills_M;
        private List<Review> reviews_M;
        private List<String> whiteListedUserIds;
}
