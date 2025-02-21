package com.ulfg2.imeps.persistence;
import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name="programs")
public class ProgramEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String description;
    private String type;
    int universityId;
    private LocalDate submissionDate;
    private String academicYear;
    private String department;


    public ProgramEntity() {
    }

    public ProgramEntity(int id, String description, String type, int universityId, LocalDate submissionDate, String academicYear, String department) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.universityId = universityId;
        this.submissionDate = submissionDate;
        this.academicYear = academicYear;
        this.department = department;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getUniversityId() {
        return universityId;
    }

    public void setUniversityId(int universityId) {
        this.universityId = universityId;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String year) {
        this.academicYear = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department){
        this.department = department;
    }
}
