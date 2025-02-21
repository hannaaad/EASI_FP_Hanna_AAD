package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.Country;
import com.ulfg2.imeps.persistence.CountryEntity;
import com.ulfg2.imeps.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class CountryController {

    @Autowired
    CountryService service;

    @GetMapping("/countries")
    public List<Country> getAll() {
        return service.getAll();
    }

    @PostMapping("/countries/{countryName}/{countryCode}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> createCountry(@PathVariable String countryName, @PathVariable String countryCode) {
        CountryEntity entity = new CountryEntity();
        entity.setCode(countryCode);
        entity.setName(countryName);
        service.create(entity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
