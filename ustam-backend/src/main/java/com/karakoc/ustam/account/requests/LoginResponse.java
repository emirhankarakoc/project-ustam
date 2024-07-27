package com.karakoc.ustam.account.requests;

import com.karakoc.ustam.user.VerificationStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private String accessToken;
    private String userRole;
    private VerificationStatus status;
}
