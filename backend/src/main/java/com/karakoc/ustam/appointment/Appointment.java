package com.karakoc.ustam.appointment;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Appointment {
    @Id
    private String id;
    private LocalDate date;
    private double price;

    private AppointmentStatus status;

    private String senderId;
    @Enumerated
    private AppointmentAnswers senderAnswer;

    private String receiverId;
    @Enumerated
    private AppointmentAnswers receiverAnswer;
}

