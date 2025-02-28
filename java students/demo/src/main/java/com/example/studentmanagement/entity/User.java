package com.example.studentmanagement.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)  // 使用 jakarta.persistence.EnumType
    private Role role;

    @OneToOne(mappedBy = "user", optional = true)
    private Student student;

    @OneToOne(mappedBy = "user", optional = true)
    private Teacher teacher;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
}