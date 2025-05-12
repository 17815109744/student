package com.example.studentmanagement.entity;

import lombok.Data;

@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String role; // ADMIN 或 USER
}