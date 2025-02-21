package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "countries")
public class CountryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private String name;
    @Column(length = 2)
    private String code;

    public CountryEntity(int id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public CountryEntity() {

    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Column(length = 2)
    public String getCode() {
        return code;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
