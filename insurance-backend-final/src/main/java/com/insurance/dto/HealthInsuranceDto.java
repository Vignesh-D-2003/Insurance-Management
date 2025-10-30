package com.insurance.dto;

import java.util.List;

public class HealthInsuranceDto {
    private String primaryHolderName;
    private String primaryHolderAge;
    private String primaryHolderGender;
    private String medicalHistory;
    private List<FamilyMemberDto> familyMembers;

    // Constructors
    public HealthInsuranceDto() {}

    // Getters and Setters
    public String getPrimaryHolderName() { return primaryHolderName; }
    public void setPrimaryHolderName(String primaryHolderName) { this.primaryHolderName = primaryHolderName; }

    public String getPrimaryHolderAge() { return primaryHolderAge; }
    public void setPrimaryHolderAge(String primaryHolderAge) { this.primaryHolderAge = primaryHolderAge; }

    public String getPrimaryHolderGender() { return primaryHolderGender; }
    public void setPrimaryHolderGender(String primaryHolderGender) { this.primaryHolderGender = primaryHolderGender; }

    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }

    public List<FamilyMemberDto> getFamilyMembers() { return familyMembers; }
    public void setFamilyMembers(List<FamilyMemberDto> familyMembers) { this.familyMembers = familyMembers; }
}