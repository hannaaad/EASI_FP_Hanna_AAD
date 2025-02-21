package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.UniversityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityRepository extends JpaRepository<UniversityEntity, Integer> {
    List<UniversityEntity> findAllByCountryId(int id);
}
