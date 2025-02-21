package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class ProgramStudentId implements Serializable {
    @Column(name = "student_id")
    private int studentId;
    @Column(name = "program_id")
    private int programId;

    public ProgramStudentId(){

    }

    public ProgramStudentId(int studentId, int programId) {
        this.studentId = studentId;
        this.programId = programId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getProgramId() {
        return programId;
    }

    public void setProgramId(int programId) {
        this.programId = programId;
    }

}
