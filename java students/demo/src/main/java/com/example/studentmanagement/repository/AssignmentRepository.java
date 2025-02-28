package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourse_Id(Long courseId);
    List<Assignment> findByDueDateBefore(Date date); // 查找截止日期之前的作业
}