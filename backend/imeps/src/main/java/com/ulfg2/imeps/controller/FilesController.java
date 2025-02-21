package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.FileRequest;
import com.ulfg2.imeps.domain.FileGenerator;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/")
public class FilesController {

    @GetMapping("/conventions/{conventionId}/attachment")
    public ResponseEntity<InputStreamResource> getAttachmentByConventionId(@PathVariable int conventionId) throws IOException {
        // Path to your PDF file
        File file = new ClassPathResource("conventions/convention_" + 1 + ".pdf").getFile();

        // Create InputStreamResource from the file
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @PostMapping("/pdf")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> generatePdf(@RequestBody FileRequest pdfRequest) throws IOException {
        InputStreamResource pdf = FileGenerator.createPdf(pdfRequest);
        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file.pdf");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/csv")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> generateCsv(@RequestBody FileRequest csvRequest) throws IOException {
        InputStreamResource csv = FileGenerator.createCsv(csvRequest);
        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file.csv");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }
}
