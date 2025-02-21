package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "universities")
public class UniversityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String name;
    private int countryId;
    private int conventionId;

    private String logoUrl;

    public UniversityEntity() {
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

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int country_id) {
        this.countryId = country_id;
    }

    public int getConventionId() {
        return conventionId;
    }

    public void setConventionId(int convention_id) {
        this.conventionId = convention_id;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
