package com.insurance.service;

import com.insurance.dto.ClaimRequest;
import com.insurance.dto.ClaimUpdateRequest;
import com.insurance.dto.DocumentDto;
import com.insurance.entity.Claim;
import com.insurance.entity.ClaimDocument;
import com.insurance.entity.ClaimStatus;
import com.insurance.entity.InsurancePolicy;
import com.insurance.entity.User;
import com.insurance.repository.ClaimRepository;
import com.insurance.repository.InsurancePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private InsurancePolicyRepository policyRepository;

    @Autowired
    private AuthService authService;

    public Claim createClaim(ClaimRequest claimRequest) {
        User currentUser = authService.getCurrentUser();
        
        InsurancePolicy policy = policyRepository.findByPolicyNumber(claimRequest.getPolicyNumber())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (!policy.getUser().getId().equals(currentUser.getId()) && !currentUser.getRole().equals("ADMIN")) {
            throw new RuntimeException("You are not authorized to create claim for this policy");
        }

        Claim claim = new Claim();
        claim.setClaimNumber(generateClaimNumber());
        claim.setPolicy(policy);
        claim.setUser(currentUser);
        claim.setClaimDescription(claimRequest.getClaimDescription());
        claim.setClaimAmount(claimRequest.getClaimAmount());
        claim.setClaimDate(claimRequest.getClaimDate());
        claim.setIncidentDate(claimRequest.getIncidentDate());
        claim.setIncidentLocation(claimRequest.getIncidentLocation());
        claim.setSupportingDocuments(claimRequest.getSupportingDocuments());
        claim.setClaimStatus(ClaimStatus.PENDING);

        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public List<Claim> getClaimsByUserId(Long userId) {
        return claimRepository.findByUserId(userId);
    }

    public List<Claim> getPendingClaims() {
        return claimRepository.findByClaimStatusOrderByCreatedAtDesc("PENDING");
    }

    public Claim updateClaimStatus(Long claimId, ClaimUpdateRequest updateRequest) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        claim.setClaimStatus(updateRequest.getClaimStatus());
        claim.setAdminRemarks(updateRequest.getAdminRemarks());
        claim.setProcessedDate(LocalDateTime.now());

        return claimRepository.save(claim);
    }

    public Claim getClaimById(Long claimId) {
        return claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));
    }

    @Value("${file.upload.dir:./uploads}")
    private String uploadDir;

    public List<DocumentDto> uploadClaimDocuments(Long claimId, MultipartFile[] files) {
        Claim claim = getClaimById(claimId);
        List<DocumentDto> documents = new ArrayList<>();
        
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(file.getInputStream(), filePath);
                    
                    ClaimDocument document = new ClaimDocument();
                    document.setClaim(claim);
                    document.setFileName(file.getOriginalFilename());
                    document.setFilePath(filePath.toString());
                    document.setFileSize(file.getSize());
                    document.setContentType(file.getContentType());
                    
                    // Save to database (you'll need ClaimDocumentRepository)
                    documents.add(new DocumentDto(
                        document.getId(),
                        document.getFileName(),
                        document.getFileSize(),
                        document.getContentType(),
                        document.getUploadedAt()
                    ));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload files: " + e.getMessage());
        }
        
        return documents;
    }

    public List<DocumentDto> getClaimDocuments(Long claimId) {
        // Implementation depends on ClaimDocumentRepository
        return new ArrayList<>();
    }

    private String generateClaimNumber() {
        Random random = new Random();
        int number = 100000 + random.nextInt(900000);
        return "CLM" + number;
    }
    
    public java.math.BigDecimal getTotalSettledAmount() {
        List<Claim> approvedClaims = claimRepository.findByClaimStatus(ClaimStatus.APPROVED);
        double total = approvedClaims.stream()
                .mapToDouble(claim -> claim.getClaimAmount() != null ? claim.getClaimAmount() : 0.0)
                .sum();
        return java.math.BigDecimal.valueOf(total);
    }
    
    public Double getSuccessRate() {
        long totalClaims = claimRepository.count();
        if (totalClaims == 0) return 0.0;
        
        long approvedClaims = claimRepository.countByClaimStatus(ClaimStatus.APPROVED);
        return (double) approvedClaims / totalClaims * 100;
    }
}