package com.insurance.controller;

import com.insurance.entity.InsuranceScheme;
import com.insurance.service.InsuranceSchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/schemes")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SchemeManagementController {
    
    @Autowired
    private InsuranceSchemeService schemeService;
    
    @GetMapping
    public ResponseEntity<List<InsuranceScheme>> getAllSchemes() {
        List<InsuranceScheme> schemes = schemeService.getAllSchemes();
        return ResponseEntity.ok(schemes);
    }
    
    @PostMapping
    public ResponseEntity<InsuranceScheme> createScheme(@RequestBody InsuranceScheme scheme) {
        InsuranceScheme createdScheme = schemeService.createScheme(scheme);
        return ResponseEntity.ok(createdScheme);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InsuranceScheme> updateScheme(@PathVariable Long id, @RequestBody InsuranceScheme scheme) {
        InsuranceScheme updatedScheme = schemeService.updateScheme(id, scheme);
        return ResponseEntity.ok(updatedScheme);
    }
    
    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<Void> toggleSchemeStatus(@PathVariable Long id) {
        schemeService.toggleSchemeStatus(id);
        return ResponseEntity.ok().build();
    }
}