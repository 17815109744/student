package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByDepartment(String department);
    List<Teacher> findByFirstNameContainingIgnoreCase(String firstName);
}