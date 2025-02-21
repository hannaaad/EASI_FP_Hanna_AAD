package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.time.LocalDate;


@Entity
@Table(name = "conventions")
public class ConventionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String name;
    private LocalDate date;
    private String attachment;

    public ConventionEntity(){}

    public ConventionEntity(int id, String name, LocalDate date, String attachment) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.attachment = attachment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }
}
