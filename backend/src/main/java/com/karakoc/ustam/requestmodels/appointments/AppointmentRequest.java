package com.karakoc.ustam.requestmodels.appointments;

import lombok.Data;


@Data
public class AppointmentRequest {
    private double price;
    private String receiverId;
}
