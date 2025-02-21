package com.ulfg2.imeps.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class StudentScholarshipId implements Serializable {
    @Column(name = "student_id")
    private int studentId;

    @Column(name = "scholarship_id")
    private int scholarshipId;

    public StudentScholarshipId(){

    }

    public StudentScholarshipId(int studentId, int programId) {
        this.studentId = studentId;
        this.scholarshipId = programId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getScholarshipId() {
        return scholarshipId;
    }

    public void setScholarshipId(int programId) {
        this.scholarshipId = programId;
    }
}
