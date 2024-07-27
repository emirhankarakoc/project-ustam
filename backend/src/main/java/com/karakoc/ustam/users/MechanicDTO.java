package com.karakoc.ustam.users;

import com.karakoc.ustam.rewiews.Review;
import com.karakoc.ustam.skills.Skill;
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
        private double point;
        private int pointCounter;
        private VerificationStatus status;
        private String extraInfo;
        private List<Skill> skills;
        private List<Review> reviews;
        private List<String> whiteListedUserIds;
}
