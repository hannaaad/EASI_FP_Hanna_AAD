package com.ulfg2.imeps.service;

import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.persistence.ProgramEntity;
import com.ulfg2.imeps.persistence.UniversityEntity;
import com.ulfg2.imeps.repo.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    @Autowired
    ProgramRepository repo;
    @Autowired
    UniversityService universityService;


    public Program findById(int id) {
        return toDomain(repo.findById(id).get());
    }

    public List<Program> getAll() {
        List<ProgramEntity> entities = repo.findAll();
        return toDomain(entities);
    }

    public void createProgram(Program program) throws Exception {
        Optional<UniversityEntity> university = universityService.getOptionalById(program.university().id());
        if (university.isEmpty())
            throw new Exception("University Not Found");
        ProgramEntity entity = new ProgramEntity();
        entity.setDescription(program.description());
        entity.setDepartment(program.department());
        entity.setType(program.type());
        entity.setAcademicYear(program.academicYear());
        entity.setSubmissionDate(program.submissionDueDate());
        entity.setUniversityId(program.university().id());
        repo.save(entity);
    }

    private List<Program> toDomain(List<ProgramEntity> entities) {
        return entities.stream().map(this::toDomain).toList();
    }

    private Program toDomain(ProgramEntity entity) {
        University university = universityService.getById(entity.getUniversityId());
        return new Program(entity.getId(),
                entity.getDescription(),
                entity.getDepartment(),
                entity.getType(),
                entity.getSubmissionDate(),
                entity.getAcademicYear(),
                university);
    }


    public void deleteProgram(int id) {
        repo.deleteById(id);
    }

    public List<Program> getByUniId(int uniId) {
        return toDomain(repo.findAllByUniversityId(uniId));
    }
}
