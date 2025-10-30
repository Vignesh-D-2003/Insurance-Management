package com.insurance.dto;

import com.insurance.entity.InsuranceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

public class InsurancePolicyRequest {
    @NotNull
    private InsuranceType insuranceType;

    @NotNull
    @Positive
    private Double premiumAmount;

    @NotNull
    @Positive
    private Double coverageAmount;

    @NotNull
    private LocalDateTime policyStartDate;

    @NotNull
    private LocalDateTime policyEndDate;

    private Boolean isNewPolicy = true;

    // Vehicle specific fields
    private String vehicleNumber;
    private String chassisNumber;
    private java.time.LocalDate registrationDate;
    private String vehicleMake;
    private String vehicleModel;
    private Integer vehicleYear;
    private String engineNumber;

    // Health insurance specific fields
    private String policyType;
    private String preExistingConditions;
    private String hospitalNetwork;
    private Double roomRentLimit;
    private Boolean ambulanceCover;

    // Term life insurance specific fields
    private String nomineeName;
    private String nomineePhone;
    private String nomineeEmail;
    private String nomineeRelation;
    private Integer termYears;
    private Boolean medicalReportRequired;
    private Boolean criticalIllnessCover;
    private Boolean accidentalDeathBenefit;

    // Nested insurance objects
    private VehicleInsuranceDto vehicleInsurance;
    private HealthInsuranceDto healthInsurance;
    private TermLifeInsuranceDto termLifeInsurance;

    // Constructors
    public InsurancePolicyRequest() {}

    // Getters and Setters
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

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getChassisNumber() { return chassisNumber; }
    public void setChassisNumber(String chassisNumber) { this.chassisNumber = chassisNumber; }

    public java.time.LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(java.time.LocalDate registrationDate) { this.registrationDate = registrationDate; }

    public String getVehicleMake() { return vehicleMake; }
    public void setVehicleMake(String vehicleMake) { this.vehicleMake = vehicleMake; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public Integer getVehicleYear() { return vehicleYear; }
    public void setVehicleYear(Integer vehicleYear) { this.vehicleYear = vehicleYear; }

    public String getEngineNumber() { return engineNumber; }
    public void setEngineNumber(String engineNumber) { this.engineNumber = engineNumber; }

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

    public VehicleInsuranceDto getVehicleInsurance() { return vehicleInsurance; }
    public void setVehicleInsurance(VehicleInsuranceDto vehicleInsurance) { this.vehicleInsurance = vehicleInsurance; }

    public HealthInsuranceDto getHealthInsurance() { return healthInsurance; }
    public void setHealthInsurance(HealthInsuranceDto healthInsurance) { this.healthInsurance = healthInsurance; }

    public TermLifeInsuranceDto getTermLifeInsurance() { return termLifeInsurance; }
    public void setTermLifeInsurance(TermLifeInsuranceDto termLifeInsurance) { this.termLifeInsurance = termLifeInsurance; }
}