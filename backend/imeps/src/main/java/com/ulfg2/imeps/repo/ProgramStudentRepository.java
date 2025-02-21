package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.ProgramStudentEntity;
import com.ulfg2.imeps.persistence.ProgramStudentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramStudentRepository extends JpaRepository<ProgramStudentEntity, Integer> {
    void deleteById(ProgramStudentId id);
}
