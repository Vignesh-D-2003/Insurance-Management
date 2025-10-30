package com.insurance.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "insurance_schemes")
public class InsuranceScheme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private BigDecimal minPremium;
    private BigDecimal maxPremium;
    private BigDecimal maxCoverage;
    private boolean isActive = true;
    
    // Constructors
    public InsuranceScheme() {}
    
    public InsuranceScheme(String name, String description, BigDecimal minPremium, 
                          BigDecimal maxPremium, BigDecimal maxCoverage) {
        this.name = name;
        this.description = description;
        this.minPremium = minPremium;
        this.maxPremium = maxPremium;
        this.maxCoverage = maxCoverage;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getMinPremium() { return minPremium; }
    public void setMinPremium(BigDecimal minPremium) { this.minPremium = minPremium; }
    
    public BigDecimal getMaxPremium() { return maxPremium; }
    public void setMaxPremium(BigDecimal maxPremium) { this.maxPremium = maxPremium; }
    
    public BigDecimal getMaxCoverage() { return maxCoverage; }
    public void setMaxCoverage(BigDecimal maxCoverage) { this.maxCoverage = maxCoverage; }
    
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}