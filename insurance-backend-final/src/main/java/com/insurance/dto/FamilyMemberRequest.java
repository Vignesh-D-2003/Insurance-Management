package com.insurance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class FamilyMemberRequest {
    @NotBlank
    @Size(max = 100)
    private String memberName;

    @Size(max = 20)
    private String memberPhone;

    @Size(max = 100)
    private String memberEmail;

    @NotBlank
    @Size(max = 50)
    private String relation;

    private LocalDate dateOfBirth;

    @Size(max = 10)
    private String gender;

    private String medicalConditions;

    // Constructors
    public FamilyMemberRequest() {}

    // Getters and Setters
    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public String getMemberPhone() { return memberPhone; }
    public void setMemberPhone(String memberPhone) { this.memberPhone = memberPhone; }

    public String getMemberEmail() { return memberEmail; }
    public void setMemberEmail(String memberEmail) { this.memberEmail = memberEmail; }

    public String getRelation() { return relation; }
    public void setRelation(String relation) { this.relation = relation; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getMedicalConditions() { return medicalConditions; }
    public void setMedicalConditions(String medicalConditions) { this.medicalConditions = medicalConditions; }
}