package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ConventionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConventionRepository extends JpaRepository<ConventionEntity, Integer> {
}
