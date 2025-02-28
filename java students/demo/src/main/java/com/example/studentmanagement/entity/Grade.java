package com.example.studentmanagement.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "grades")
public class Grade implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Double gradeValue;
    private Date gradeDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Double getGradeValue() { return gradeValue; }
    public void setGradeValue(Double gradeValue) { this.gradeValue = gradeValue; }
    public Date getGradeDate() { return gradeDate; }
    public void setGradeDate(Date gradeDate) { this.gradeDate = gradeDate; }
}