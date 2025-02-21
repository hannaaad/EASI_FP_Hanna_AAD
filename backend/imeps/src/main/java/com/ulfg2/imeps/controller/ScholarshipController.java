package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Scholarship;
import com.ulfg2.imeps.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class ScholarshipController {

    @Autowired
    ScholarshipService service;

    @GetMapping("/scholarships")
    public List<Scholarship> getAll() {
        return service.getAll();
    }

    @PostMapping("/scholarships")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> createScholarship(@RequestBody Scholarship scholarship) {
        service.createScholarship(scholarship);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/scholarships/{scholarshipId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteScholarship(@PathVariable int scholarshipId) {
        service.deleteScholarship(scholarshipId);
        return ResponseEntity.ok().build();
    }
}
