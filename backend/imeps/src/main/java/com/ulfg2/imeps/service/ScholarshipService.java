package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Scholarship;
import com.ulfg2.imeps.persistence.ScholarshipEntity;
import com.ulfg2.imeps.repo.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScholarshipService {

    @Autowired
    ScholarshipRepository repo;

    public List<Scholarship> getAll() {
        List<ScholarshipEntity> scholarshipEntities = repo.findAll();
        List<Scholarship> scholarships = new ArrayList<>();
        scholarshipEntities.forEach(s -> scholarships.add(new Scholarship(s.getId(), s.getName(), s.getDescription(), s.getDuration())));
        return scholarships;
    }

    public void createScholarship(Scholarship scholarship) {
        ScholarshipEntity entity = new ScholarshipEntity();
        entity.setDescription(scholarship.description());
        entity.setDuration(scholarship.duration());
        entity.setName(scholarship.name());
        repo.save(entity);
    }

    public void deleteScholarship(int id) {
        repo.deleteById(id);
    }
}
