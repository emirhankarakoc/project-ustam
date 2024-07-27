package com.karakoc.ustam.appointment;

import com.karakoc.ustam.user.User;
import com.karakoc.ustam.user.UserDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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

