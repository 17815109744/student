package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentMapper studentMapper;

    public List<Student> getAllStudents() {
        return studentMapper.findAll();
    }

    public Student getStudentById(Integer id) {
        return studentMapper.findById(id);
    }

    public void addStudent(Student student) {
        studentMapper.insert(student);
    }

    public void updateStudent(Student student) {
        studentMapper.update(student);
    }

    public void deleteStudent(Integer id) {
        studentMapper.delete(id);
    }
}