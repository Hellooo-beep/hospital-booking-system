package com.hospital.booking_system.dto;

public class AuthResponse {
    private String message;
    private String token;
    private String role;
    private String name;

    // Constructor
    public AuthResponse(String message, String token, String role, String name) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.name = name;
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }

    // Setters
    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setName(String name) {
        this.name = name;
    }
}
