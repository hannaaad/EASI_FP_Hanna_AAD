package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

@Entity
@Table(name="student_scholarship")
public class StudentScholarshipEntity {
    @EmbeddedId
    StudentScholarshipId id;
    private String status;

    public StudentScholarshipEntity() {
    }

    public StudentScholarshipEntity(StudentScholarshipId id, String status) {
        this.id = id;
        this.status = status;
    }

    public StudentScholarshipId getId() {
        return id;
    }

    public void setId(StudentScholarshipId id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



}
