package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Convention;
import com.ulfg2.imeps.persistence.ConventionEntity;
import com.ulfg2.imeps.repo.ConventionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConventionService {

    @Autowired
    ConventionRepository repo;


    public List<Convention> getAll() {
        return repo.findAll().stream().map(c -> new Convention(c.getId(), c.getName(), c.getDate(), c.getAttachment())).toList();
    }

    public Convention getById(int id) {
        ConventionEntity conventionEntity = repo.findById(id).get();
        return new Convention(conventionEntity.getId(), conventionEntity.getName(), conventionEntity.getDate(), conventionEntity.getAttachment());
    }

    public int create(Convention convention) {
        ConventionEntity conventionEntity = new ConventionEntity();
        conventionEntity.setName(convention.name());
        conventionEntity.setDate(convention.date());
        conventionEntity.setAttachment(convention.attachment());
        return repo.save(conventionEntity).getId();
    }
}
