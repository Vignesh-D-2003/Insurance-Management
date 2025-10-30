package com.insurance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "term_life_insurance")
public class TermLifeInsurance extends InsurancePolicy {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "primary_policy_holder_id")
    private User primaryPolicyHolder;

    @NotBlank
    @Size(max = 100)
    @Column(name = "nominee_name")
    private String nomineeName;

    @Size(max = 20)
    @Column(name = "nominee_phone")
    private String nomineePhone;

    @Size(max = 100)
    @Column(name = "nominee_email")
    private String nomineeEmail;

    @Size(max = 50)
    @Column(name = "nominee_relation")
    private String nomineeRelation;

    @NotNull
    @Column(name = "term_years")
    private Integer termYears;

    @Column(name = "medical_report_required")
    private Boolean medicalReportRequired;

    @Column(name = "critical_illness_cover")
    private Boolean criticalIllnessCover;

    @Column(name = "accidental_death_benefit")
    private Boolean accidentalDeathBenefit;

    // Constructors
    public TermLifeInsurance() {
        super();
    }

    public TermLifeInsurance(User primaryPolicyHolder, String nomineeName) {
        super();
        this.primaryPolicyHolder = primaryPolicyHolder;
        this.nomineeName = nomineeName;
    }

    // Getters and Setters
    public User getPrimaryPolicyHolder() { return primaryPolicyHolder; }
    public void setPrimaryPolicyHolder(User primaryPolicyHolder) { this.primaryPolicyHolder = primaryPolicyHolder; }

    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getNomineePhone() { return nomineePhone; }
    public void setNomineePhone(String nomineePhone) { this.nomineePhone = nomineePhone; }

    public String getNomineeEmail() { return nomineeEmail; }
    public void setNomineeEmail(String nomineeEmail) { this.nomineeEmail = nomineeEmail; }

    public String getNomineeRelation() { return nomineeRelation; }
    public void setNomineeRelation(String nomineeRelation) { this.nomineeRelation = nomineeRelation; }

    public Integer getTermYears() { return termYears; }
    public void setTermYears(Integer termYears) { this.termYears = termYears; }

    public Boolean getMedicalReportRequired() { return medicalReportRequired; }
    public void setMedicalReportRequired(Boolean medicalReportRequired) { this.medicalReportRequired = medicalReportRequired; }

    public Boolean getCriticalIllnessCover() { return criticalIllnessCover; }
    public void setCriticalIllnessCover(Boolean criticalIllnessCover) { this.criticalIllnessCover = criticalIllnessCover; }

    public Boolean getAccidentalDeathBenefit() { return accidentalDeathBenefit; }
    public void setAccidentalDeathBenefit(Boolean accidentalDeathBenefit) { this.accidentalDeathBenefit = accidentalDeathBenefit; }
}