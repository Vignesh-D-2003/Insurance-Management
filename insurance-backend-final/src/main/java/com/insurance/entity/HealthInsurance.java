package com.insurance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "health_insurance")
public class HealthInsurance extends InsurancePolicy {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primary_policy_holder_id")
    private User primaryPolicyHolder;

    @OneToMany(mappedBy = "healthInsurance", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<FamilyMember> familyMembers = new HashSet<>();

    @Size(max = 50)
    @Column(name = "policy_type")
    private String policyType;

    @Column(name = "pre_existing_conditions")
    private String preExistingConditions;

    @Column(name = "hospital_network")
    private String hospitalNetwork;

    @Column(name = "room_rent_limit")
    private Double roomRentLimit;

    @Column(name = "ambulance_cover")
    private Boolean ambulanceCover;

    // Constructors
    public HealthInsurance() {
        super();
    }

    public HealthInsurance(User primaryPolicyHolder) {
        super();
        this.primaryPolicyHolder = primaryPolicyHolder;
    }

    // Getters and Setters
    public User getPrimaryPolicyHolder() { return primaryPolicyHolder; }
    public void setPrimaryPolicyHolder(User primaryPolicyHolder) { this.primaryPolicyHolder = primaryPolicyHolder; }

    public Set<FamilyMember> getFamilyMembers() { return familyMembers; }
    public void setFamilyMembers(Set<FamilyMember> familyMembers) { this.familyMembers = familyMembers; }

    public String getPolicyType() { return policyType; }
    public void setPolicyType(String policyType) { this.policyType = policyType; }

    public String getPreExistingConditions() { return preExistingConditions; }
    public void setPreExistingConditions(String preExistingConditions) { this.preExistingConditions = preExistingConditions; }

    public String getHospitalNetwork() { return hospitalNetwork; }
    public void setHospitalNetwork(String hospitalNetwork) { this.hospitalNetwork = hospitalNetwork; }

    public Double getRoomRentLimit() { return roomRentLimit; }
    public void setRoomRentLimit(Double roomRentLimit) { this.roomRentLimit = roomRentLimit; }

    public Boolean getAmbulanceCover() { return ambulanceCover; }
    public void setAmbulanceCover(Boolean ambulanceCover) { this.ambulanceCover = ambulanceCover; }
}