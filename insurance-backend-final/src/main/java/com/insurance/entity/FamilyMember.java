package com.insurance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "family_members")
public class FamilyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "member_name")
    private String memberName;

    @Size(max = 20)
    @Column(name = "member_phone")
    private String memberPhone;

    @Size(max = 100)
    @Column(name = "member_email")
    private String memberEmail;

    @Size(max = 50)
    @Column(name = "relation")
    private String relation;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Size(max = 10)
    @Column(name = "gender")
    private String gender;

    @Column(name = "medical_conditions")
    private String medicalConditions;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "health_insurance_id")
    private HealthInsurance healthInsurance;

    // Constructors
    public FamilyMember() {
    }

    public FamilyMember(String memberName, String relation) {
        this.memberName = memberName;
        this.relation = relation;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public HealthInsurance getHealthInsurance() { return healthInsurance; }
    public void setHealthInsurance(HealthInsurance healthInsurance) { this.healthInsurance = healthInsurance; }
}