# Hospital Appointment Booking System

A full-stack web application for managing hospital appointments, built with Spring Boot.

##  Features

### User Management
- User registration and authentication
- Role-based access (Admin/Customer)
- Secure login system

### Doctor Management
- Add, update, and delete doctors
- Search doctors by specialization
- View doctor availability

### Appointment System
- Book appointments with doctors
- View customer appointments
- Admin approval workflow
- Status management (Pending/Approved/Cancelled)
- Cancel appointments

##  Tech Stack

- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Data JPA**
- **H2 Database** (in-memory)
- **Maven**
- **Lombok**
- **RESTful API**

##  Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Installation

1. Clone the repository
```bash
git clone https://github.com/Found-1-owners/hospital-booking-system.git
cd hospital-booking-system
```

2. Run the application
```bash
mvn spring-boot:run
```

3. The application will start on `http://localhost:8081`

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/test` - Test endpoint

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `GET /api/doctors/specialization/{spec}` - Get doctors by specialization
- `POST /api/doctors` - Add new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments/customer/{customerId}` - Get customer appointments
- `GET /api/appointments/doctor/{doctorId}` - Get doctor appointments
- `GET /api/appointments/status/{status}` - Get appointments by status
- `PUT /api/appointments/{id}/status` - Update appointment status
- `PUT /api/appointments/{id}/cancel` - Cancel appointment
- `DELETE /api/appointments/{id}` - Delete appointment

##  Database Schema

### Users Table
```
id, name, email, password, role (ADMIN/CUSTOMER), created_at
```

### Doctors Table
```
id, name, specialization, email, phone, available_days, created_at
```

### Appointments Table
```
id, customer_id, doctor_id, appointment_date, time_slot, status, created_at
```

##  Testing

Use Postman to test the APIs:

**1. Register a user:**
```json
POST http://localhost:8081/api/auth/register
{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "password123",
    "role": "CUSTOMER"
}
```

**2. Add a doctor:**
```json
POST http://localhost:8081/api/doctors
{
    "name": "Dr. Sarah Smith",
    "specialization": "Cardiology",
    "email": "sarah@hospital.com",
    "phone": "555-0101",
    "availableDays": "Monday,Wednesday,Friday"
}
```

**3. Book an appointment:**
```json
POST http://localhost:8081/api/appointments
{
    "customerId": 1,
    "doctorId": 1,
    "appointmentDate": "2026-01-20",
    "timeSlot": "10:00 AM"
}
```

##  Future Enhancements

- [ ] JWT authentication
- [ ] Password encryption (BCrypt)
- [ ] React frontend
- [ ] Email notifications
- [ ] PostgreSQL for production
- [ ] Docker deployment
- [ ] Unit tests
- [ ] Swagger API documentation


Built as a learning project to demonstrate full-stack development skills with Spring Boot.
