package com.karakoc.ustam.requestmodels.appointments;

import com.karakoc.ustam.appointment.Appointment;
import lombok.Data;

import java.util.List;

@Data
public class AllAppointmentsResponse {
    private List<Appointment> sended;
    private List<Appointment> received;
}
