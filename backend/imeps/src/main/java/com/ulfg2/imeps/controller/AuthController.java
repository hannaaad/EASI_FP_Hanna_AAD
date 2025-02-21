package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.LoginResponse;
import com.ulfg2.imeps.persistence.*;
import com.ulfg2.imeps.repo.StudentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class AuthController {

    @Autowired
    StudentRepository repo;

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity userEntity = (UserEntity) userDetails;
        return ResponseEntity.ok(new LoginResponse(userEntity.getId(), userEntity.getUsername(), userEntity.getIsAdmin()));
    }

    // Vulnerable endpoint for demonstration
    // Send this username for injection: { ' OR '1'='1 }
    @PostMapping("/vulnerable-login")
    public List<UserEntity> getVulnerableUsers(@RequestParam String username) {
        Session session = entityManager.unwrap(Session.class);

        // Vulnerable HQL query (concatenating user input directly)
        String hql = "FROM UserEntity WHERE username = '" + username + "'";
        Query<UserEntity> query = session.createQuery(hql, UserEntity.class);

        return query.getResultList();
    }

}
