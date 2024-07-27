package com.karakoc.ustam.appointment;

import lombok.Data;

import java.util.List;

@Data
public class AllAppointmentsResponse {
    private List<Appointment> sended;
    private List<Appointment> received;
}
