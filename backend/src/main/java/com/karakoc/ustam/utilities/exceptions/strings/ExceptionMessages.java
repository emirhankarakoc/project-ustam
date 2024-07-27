package com.karakoc.ustam.utilities.exceptions.strings;

import lombok.Data;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class ExceptionMessages {
    private final String EMAIL_ADRESS_EXISTING_400 = "This e-mail adress is already used.";
    private final String USER_NOT_FOUND_404 = "User not found.";
    private final String ID_CARD_NOT_FOUND_404 = "Id Card not found.";
    private final String SKILL_NOT_FOUND_404 = "Skill not found.";
    private final String APPOINTMENT_NOT_FOUND_404 = "Appointment not found.";

    private final String LOG_IN_FIRST= "You must logged in for send this request.";
    private final String LOW_BALANCE="You don't have money for buy,you should add balance to your account.";
    private final String ALREADY_VERIFICATED = "You already verificated your account.";

    //socket
    private final String SOCKET_IDCARD_ACCEPTED = "Identify card accepted.";
    private final String SOCKET_IDCARD_REJECTED = "Identify card rejected.";
}
