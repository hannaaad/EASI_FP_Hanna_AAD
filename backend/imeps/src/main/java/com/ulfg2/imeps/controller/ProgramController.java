package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Program;
import com.ulfg2.imeps.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProgramController {

    @Autowired
    ProgramService service;

    @GetMapping("/programs")
    public List<Program> getAll() {
        return service.getAll();
    }

    @GetMapping("/programs/{programId}")
    public Program getById(@PathVariable int programId){
        return service.findById(programId);
    }

    @GetMapping("/programs/university/{uniId}")
    public List<Program> getByUniId(@PathVariable int uniId){
        return service.getByUniId(uniId);
    }

    @PostMapping("/programs")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> createProgram(@RequestBody Program program) throws Exception {
        service.createProgram(program);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/programs/{programId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteProgram(@PathVariable int programId) {
        service.deleteProgram(programId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
