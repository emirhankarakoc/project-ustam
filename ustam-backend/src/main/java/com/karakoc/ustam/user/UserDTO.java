package com.karakoc.ustam.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String role;
    private String phoneNumber;
    private VerificationStatus status;
    private List<String> whiteListedUserIds;



}
