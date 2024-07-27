package com.karakoc.ustam.requestmodels.auth;

import com.karakoc.ustam.users.VerificationStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private String accessToken;
    private String userRole;
    private VerificationStatus status;
}
