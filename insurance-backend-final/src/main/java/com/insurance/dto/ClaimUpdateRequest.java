package com.insurance.dto;

import com.insurance.entity.ClaimStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ClaimUpdateRequest {
    @NotNull
    private ClaimStatus claimStatus;

    @NotBlank
    @jakarta.validation.constraints.Size(max = 500)
    private String adminRemarks;

    // Constructors
    public ClaimUpdateRequest() {}

    // Getters and Setters
    public ClaimStatus getClaimStatus() { return claimStatus; }
    public void setClaimStatus(ClaimStatus claimStatus) { this.claimStatus = claimStatus; }

    public String getAdminRemarks() { return adminRemarks; }
    public void setAdminRemarks(String adminRemarks) { this.adminRemarks = adminRemarks; }
}