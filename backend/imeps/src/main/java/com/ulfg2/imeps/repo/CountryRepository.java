package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryRepository extends JpaRepository<CountryEntity, Integer> {
    Optional<CountryEntity> findByCode(String code);
}
