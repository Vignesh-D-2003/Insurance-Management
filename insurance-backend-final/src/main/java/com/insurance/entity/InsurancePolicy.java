package com.insurance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "insurance_policies")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class InsurancePolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "policy_number", unique = true)
    private String policyNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "insurance_type")
    private InsuranceType insuranceType;

    @NotNull
    @Positive
    @Column(name = "premium_amount")
    private Double premiumAmount;

    @NotNull
    @Positive
    @Column(name = "coverage_amount")
    private Double coverageAmount;

    @NotNull
    @Column(name = "policy_start_date")
    private LocalDateTime policyStartDate;

    @NotNull
    @Column(name = "policy_end_date")
    private LocalDateTime policyEndDate;

    @Column(name = "is_new_policy")
    private Boolean isNewPolicy;

    @Column(name = "policy_status")
    @Enumerated(EnumType.STRING)
    private PolicyStatus policyStatus;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public InsurancePolicy() {
        this.createdAt = LocalDateTime.now();
        this.policyStatus = PolicyStatus.ACTIVE;
        this.isNewPolicy = true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPolicyNumber() { return policyNumber; }
    public void setPolicyNumber(String policyNumber) { this.policyNumber = policyNumber; }

    public InsuranceType getInsuranceType() { return insuranceType; }
    public void setInsuranceType(InsuranceType insuranceType) { this.insuranceType = insuranceType; }

    public Double getPremiumAmount() { return premiumAmount; }
    public void setPremiumAmount(Double premiumAmount) { this.premiumAmount = premiumAmount; }

    public Double getCoverageAmount() { return coverageAmount; }
    public void setCoverageAmount(Double coverageAmount) { this.coverageAmount = coverageAmount; }

    public LocalDateTime getPolicyStartDate() { return policyStartDate; }
    public void setPolicyStartDate(LocalDateTime policyStartDate) { this.policyStartDate = policyStartDate; }

    public LocalDateTime getPolicyEndDate() { return policyEndDate; }
    public void setPolicyEndDate(LocalDateTime policyEndDate) { this.policyEndDate = policyEndDate; }

    public Boolean getIsNewPolicy() { return isNewPolicy; }
    public void setIsNewPolicy(Boolean isNewPolicy) { this.isNewPolicy = isNewPolicy; }

    public PolicyStatus getPolicyStatus() { return policyStatus; }
    public void setPolicyStatus(PolicyStatus policyStatus) { this.policyStatus = policyStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}