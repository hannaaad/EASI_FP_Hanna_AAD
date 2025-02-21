package com.ulfg2.imeps.repo;

import com.ulfg2.imeps.persistence.StudentScholarshipEntity;
import com.ulfg2.imeps.persistence.StudentScholarshipId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentScholarshipRepository extends JpaRepository<StudentScholarshipEntity, Integer> {

    void deleteById(StudentScholarshipId studentScholarshipId);
}
