package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Convention;
import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.persistence.CountryEntity;
import com.ulfg2.imeps.persistence.UniversityEntity;
import com.ulfg2.imeps.repo.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository uniRepo;
    @Autowired
    private ConventionService conventionService;
    @Autowired
    private CountryService countryService;

    public List<University> getAll() {
        List<UniversityEntity> universityEntities = uniRepo.findAll();
        return toDomain(universityEntities);
    }

    public List<University> getByCountryCode(String countryCode) {
        CountryEntity country = countryService.getByCountryCode(countryCode).get();
        List<UniversityEntity> universityEntities = uniRepo.findAllByCountryId(country.getId());
        List<University> universities = new ArrayList<>();
        universityEntities.forEach(u -> universities.add(new University(u.getId(), u.getName(), new Country(country.getName(), country.getCode()), conventionService.getById(u.getConventionId()), u.getLogoUrl())));
        return universities;
    }

    public University getById(int id) {
        UniversityEntity entity = getOptionalById(id).get();
        return toDomain(entity);
    }

    public Optional<UniversityEntity> getOptionalById(int id) {
        return uniRepo.findById(id);
    }


    private List<University> toDomain(List<UniversityEntity> universityEntities) {
        List<University> universities = new ArrayList<>();
        universityEntities.forEach(entity -> {
            universities.add(toDomain(entity));
        });
        return universities;
    }

    private University toDomain(UniversityEntity entity) {
        Country country = getCountry(entity);
        Convention convention = conventionService.getById(entity.getConventionId());
        return new University(entity.getId(), entity.getName(), country, convention, entity.getLogoUrl());
    }

    private Country getCountry(UniversityEntity universityEntity) {
        CountryEntity countryEntity = countryService.getById(universityEntity.getCountryId()).get();
        return new Country(countryEntity.getName(), countryEntity.getCode());
    }

    public void create(University university) {
        int conventionId = conventionService.create(university.convention());
        Optional<CountryEntity> entity = countryService.getByCountryCode(university.country().code());
        CountryEntity countryEntity;
        if (entity.isEmpty()) {
            countryEntity = new CountryEntity();
            countryEntity.setName(university.country().name());
            countryEntity.setCode(university.country().code());
            countryService.create(countryEntity);
        } else {
            countryEntity = entity.get();
        }
        UniversityEntity universityEntity = new UniversityEntity();
        universityEntity.setCountryId(countryEntity.getId());
        universityEntity.setName(university.name());
        universityEntity.setConventionId(conventionId);
        universityEntity.setLogoUrl(university.logoUrl());
        uniRepo.save(universityEntity);
    }
}
