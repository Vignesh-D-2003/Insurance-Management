package com.insurance.dto;

public class TermLifeInsuranceDto {
    private String primaryHolderName;
    private String primaryHolderAge;
    private String primaryHolderGender;
    private String nomineeName;
    private String nomineeRelationship;
    private String nomineeAge;
    private String medicalHistory;

    // Constructors
    public TermLifeInsuranceDto() {}

    // Getters and Setters
    public String getPrimaryHolderName() { return primaryHolderName; }
    public void setPrimaryHolderName(String primaryHolderName) { this.primaryHolderName = primaryHolderName; }

    public String getPrimaryHolderAge() { return primaryHolderAge; }
    public void setPrimaryHolderAge(String primaryHolderAge) { this.primaryHolderAge = primaryHolderAge; }

    public String getPrimaryHolderGender() { return primaryHolderGender; }
    public void setPrimaryHolderGender(String primaryHolderGender) { this.primaryHolderGender = primaryHolderGender; }

    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getNomineeRelationship() { return nomineeRelationship; }
    public void setNomineeRelationship(String nomineeRelationship) { this.nomineeRelationship = nomineeRelationship; }

    public String getNomineeAge() { return nomineeAge; }
    public void setNomineeAge(String nomineeAge) { this.nomineeAge = nomineeAge; }

    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }
}