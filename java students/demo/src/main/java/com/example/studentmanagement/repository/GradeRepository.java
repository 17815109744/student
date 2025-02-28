package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    Grade findByStudent_IdAndCourse_Id(Long studentId, Long courseId);
    List<Grade> findByStudent_Id(Long studentId);
    List<Grade> findByCourse_Id(Long courseId);
}