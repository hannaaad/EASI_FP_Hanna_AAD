package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ScholarshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScholarshipRepository extends JpaRepository <ScholarshipEntity, Integer> {
}
