package com.insurance.controller;

import com.insurance.dto.ClaimRequest;
import com.insurance.dto.ClaimUpdateRequest;
import com.insurance.dto.DocumentDto;
import com.insurance.entity.Claim;
import com.insurance.service.AuthService;
import com.insurance.service.ClaimService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<?> createClaim(@Valid @RequestBody ClaimRequest claimRequest) {
        try {
            Claim claim = claimService.createClaim(claimRequest);
            return ResponseEntity.ok(claim);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-claims")
    public ResponseEntity<List<Claim>> getMyClaims() {
        List<Claim> claims = claimService.getClaimsByUserId(authService.getCurrentUser().getId());
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Claim>> getPendingClaims() {
        List<Claim> claims = claimService.getPendingClaims();
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Claim>> getAllClaims() {
        List<Claim> claims = claimService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    @PutMapping("/{claimId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateClaimStatus(@PathVariable Long claimId, 
                                              @Valid @RequestBody ClaimUpdateRequest updateRequest) {
        try {
            Claim claim = claimService.updateClaimStatus(claimId, updateRequest);
            return ResponseEntity.ok(claim);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{claimId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<?> getClaimById(@PathVariable Long claimId) {
        try {
            Claim claim = claimService.getClaimById(claimId);
            return ResponseEntity.ok(claim);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{claimId}/documents")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<?> uploadClaimDocuments(
            @PathVariable Long claimId,
            @RequestParam("files") MultipartFile[] files) {
        try {
            List<DocumentDto> documents = claimService.uploadClaimDocuments(claimId, files);
            return ResponseEntity.ok(documents);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{claimId}/documents")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<List<DocumentDto>> getClaimDocuments(@PathVariable Long claimId) {
        List<DocumentDto> documents = claimService.getClaimDocuments(claimId);
        return ResponseEntity.ok(documents);
    }
}