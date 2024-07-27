package com.karakoc.ustam.appointment;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentRequest {
    private double price;
    private String receiverId;
}
