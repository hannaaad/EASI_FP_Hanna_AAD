package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;


@Entity
@Table(name="program_student")
public class ProgramStudentEntity {

    @EmbeddedId
    private ProgramStudentId id;

    private String status;


    public ProgramStudentEntity(){

    }

    public ProgramStudentEntity(ProgramStudentId id, String status) {
        this.id = id;
        this.status = status;
    }

    public ProgramStudentId getId() {
        return id;
    }

    public void setId(ProgramStudentId id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
