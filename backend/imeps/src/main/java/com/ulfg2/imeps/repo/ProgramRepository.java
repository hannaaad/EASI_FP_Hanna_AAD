package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ProgramEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramRepository extends JpaRepository<ProgramEntity, Integer> {
    List<ProgramEntity> findAllByUniversityId(int universityId);
}
