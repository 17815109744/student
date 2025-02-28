package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent_Id(Long studentId);
    List<Enrollment> findByCourse_Id(Long courseId);
    List<Enrollment> findByEnrollmentDateBetween(Date start, Date end);
}