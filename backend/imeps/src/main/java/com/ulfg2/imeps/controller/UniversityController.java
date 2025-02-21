package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.University;
import com.ulfg2.imeps.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class UniversityController {

    @Autowired
    UniversityService service;

    @GetMapping("/universities")
    public List<University> getAll() {
        return service.getAll();
    }

    @GetMapping("/universities/country/{countryCode}")
    public List<University> getByCountryCode(@PathVariable String countryCode) {
        return service.getByCountryCode(countryCode);
    }

    @GetMapping("/universities/{id}")
    public University getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping("/universities")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> createUniversity(@RequestBody University university) {
        service.create(university);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
