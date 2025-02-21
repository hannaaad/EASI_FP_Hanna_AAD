package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.persistence.CountryEntity;
import com.ulfg2.imeps.repo.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    CountryRepository repo;

    public List<Country> getAll() {
        List<CountryEntity> countryEntities = repo.findAll();
        List<Country> country = new ArrayList<>();
        countryEntities.forEach(c -> country.add(new Country(c.getName(), c.getCode())));
        return country;
    }

    public Optional<CountryEntity> getByCountryCode(String code) {
        return repo.findByCode(code);
    }

    public Optional<CountryEntity> getById(int id) {
        return repo.findById(id);
    }

    public CountryEntity create(CountryEntity entity) {
        return repo.save(entity);
    }
}
