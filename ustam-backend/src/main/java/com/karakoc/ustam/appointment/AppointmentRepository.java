package com.karakoc.ustam.appointment;

import org.springframework.aop.target.LazyInitTargetSource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,String > {
    List<Appointment> findAllByReceiverId(String receiverId);
    List<Appointment> findAllBySenderId(String senderId);

}
