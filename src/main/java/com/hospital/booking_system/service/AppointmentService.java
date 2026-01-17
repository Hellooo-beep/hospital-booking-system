package com.hospital.booking_system.service;

import com.hospital.booking_system.dto.AppointmentRequest;
import com.hospital.booking_system.model.Appointment;
import com.hospital.booking_system.model.User;
import com.hospital.booking_system.model.Doctor;
import com.hospital.booking_system.repository.AppointmentRepository;
import com.hospital.booking_system.repository.UserRepository;
import com.hospital.booking_system.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    // Book appointment
    public Appointment bookAppointment(AppointmentRequest request) {
        User customer = userRepository.findById(request.getCustomerId())
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        Appointment appointment = new Appointment();
        appointment.setCustomer(customer);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setStatus("PENDING");
        
        return appointmentRepository.save(appointment);
    }
    
    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
    
    // Get appointment by ID
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }
    
    // Get customer appointments
    public List<Appointment> getCustomerAppointments(Long customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }
    
    // Get doctor appointments
    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
    
    // Get appointments by status
    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }
    
    // Update appointment status
    public Appointment updateStatus(Long id, String status) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
    
    // Cancel appointment
    public void cancelAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);
    }
    
    // Delete appointment
    public void deleteAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointmentRepository.delete(appointment);
    }
}