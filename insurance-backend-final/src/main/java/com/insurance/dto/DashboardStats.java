package com.insurance.dto;

import java.math.BigDecimal;

public class DashboardStats {
    private Long totalPolicies;
    private BigDecimal totalAmountSettled;
    private Long totalCustomers;
    private Double claimSuccessRate;
    
    public DashboardStats() {}
    
    public DashboardStats(Long totalPolicies, BigDecimal totalAmountSettled, 
                         Long totalCustomers, Double claimSuccessRate) {
        this.totalPolicies = totalPolicies;
        this.totalAmountSettled = totalAmountSettled;
        this.totalCustomers = totalCustomers;
        this.claimSuccessRate = claimSuccessRate;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        private Long totalPolicies;
        private BigDecimal totalAmountSettled;
        private Long totalCustomers;
        private Double claimSuccessRate;
        
        public Builder totalPolicies(Long totalPolicies) {
            this.totalPolicies = totalPolicies;
            return this;
        }
        
        public Builder totalAmountSettled(BigDecimal totalAmountSettled) {
            this.totalAmountSettled = totalAmountSettled;
            return this;
        }
        
        public Builder totalCustomers(Long totalCustomers) {
            this.totalCustomers = totalCustomers;
            return this;
        }
        
        public Builder claimSuccessRate(Double claimSuccessRate) {
            this.claimSuccessRate = claimSuccessRate;
            return this;
        }
        
        public DashboardStats build() {
            return new DashboardStats(totalPolicies, totalAmountSettled, totalCustomers, claimSuccessRate);
        }
    }
    
    // Getters and Setters
    public Long getTotalPolicies() { return totalPolicies; }
    public void setTotalPolicies(Long totalPolicies) { this.totalPolicies = totalPolicies; }
    
    public BigDecimal getTotalAmountSettled() { return totalAmountSettled; }
    public void setTotalAmountSettled(BigDecimal totalAmountSettled) { this.totalAmountSettled = totalAmountSettled; }
    
    public Long getTotalCustomers() { return totalCustomers; }
    public void setTotalCustomers(Long totalCustomers) { this.totalCustomers = totalCustomers; }
    
    public Double getClaimSuccessRate() { return claimSuccessRate; }
    public void setClaimSuccessRate(Double claimSuccessRate) { this.claimSuccessRate = claimSuccessRate; }
}