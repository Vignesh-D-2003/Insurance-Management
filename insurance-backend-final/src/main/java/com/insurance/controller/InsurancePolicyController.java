package com.insurance.controller;

import com.insurance.dto.InsurancePolicyRequest;
import com.insurance.entity.InsurancePolicy;
import com.insurance.service.InsurancePolicyService;
import com.insurance.service.PdfService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InsurancePolicyController {

    @Autowired
    private InsurancePolicyService policyService;

    @Autowired
    private PdfService pdfService;

    @PostMapping
    public ResponseEntity<?> createPolicy(@Valid @RequestBody InsurancePolicyRequest request) {
        try {
            System.out.println("Creating policy - Type: " + request.getInsuranceType());
            System.out.println("Premium: " + request.getPremiumAmount());
            System.out.println("Coverage: " + request.getCoverageAmount());
            InsurancePolicy policy = policyService.createPolicy(request);
            return ResponseEntity.ok(policy);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/my-policies")
    public ResponseEntity<List<InsurancePolicy>> getMyPolicies() {
        try {
            List<InsurancePolicy> policies = policyService.getUserPolicies();
            return ResponseEntity.ok(policies);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InsurancePolicy>> getAllPolicies() {
        List<InsurancePolicy> policies = policyService.getAllPolicies();
        return ResponseEntity.ok(policies);
    }

    @GetMapping("/{policyId}")
    public ResponseEntity<?> getPolicyById(@PathVariable Long policyId) {
        try {
            InsurancePolicy policy = policyService.getPolicyById(policyId);
            return ResponseEntity.ok(policy);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{policyId}/document")
    public ResponseEntity<byte[]> generatePolicyDocument(@PathVariable Long policyId) {
        try {
            byte[] pdfContent = pdfService.generatePolicyDocument(policyId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "policy_" + policyId + ".pdf");
            headers.setContentLength(pdfContent.length);
            
            return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}