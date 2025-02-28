package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudent_Id(Long studentId);
    List<Submission> findByAssignment_Id(Long assignmentId);
    List<Submission> findBySubmissionDateAfter(Date date); // 查找提交时间之后的记录
}