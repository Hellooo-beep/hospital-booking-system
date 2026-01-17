package com.hospital.booking_system.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AppointmentRequest {
    private Long customerId;
    private Long doctorId;
    private LocalDate appointmentDate;
    private String timeSlot;
}