package com.insurance.mapper;

import com.insurance.dto.InsurancePolicyRequest;
import com.insurance.entity.*;
import org.springframework.stereotype.Component;

@Component
public class InsurancePolicyMapper {

    public InsurancePolicy mapToEntity(InsurancePolicyRequest request, User user) {
        InsurancePolicy policy;
        
        switch (request.getInsuranceType()) {
            case BIKE:
            case CAR:
                policy = mapToVehicleInsurance(request, user);
                break;
            case HEALTH:
                policy = mapToHealthInsurance(request, user);
                break;
            case TERM_LIFE:
                policy = mapToTermLifeInsurance(request, user);
                break;
            default:
                throw new IllegalArgumentException("Invalid insurance type: " + request.getInsuranceType());
        }
        
        return policy;
    }

    private VehicleInsurance mapToVehicleInsurance(InsurancePolicyRequest request, User user) {
        VehicleInsurance vehicleInsurance = new VehicleInsurance();
        vehicleInsurance.setInsuranceType(request.getInsuranceType());
        vehicleInsurance.setPremiumAmount(request.getPremiumAmount());
        vehicleInsurance.setCoverageAmount(request.getCoverageAmount());
        vehicleInsurance.setPolicyStartDate(request.getPolicyStartDate());
        vehicleInsurance.setPolicyEndDate(request.getPolicyEndDate());
        vehicleInsurance.setIsNewPolicy(request.getIsNewPolicy());
        vehicleInsurance.setUser(user);
        vehicleInsurance.setVehicleNumber(request.getVehicleNumber());
        vehicleInsurance.setChassisNumber(request.getChassisNumber());
        vehicleInsurance.setRegistrationDate(request.getRegistrationDate());
        vehicleInsurance.setVehicleMake(request.getVehicleMake());
        vehicleInsurance.setVehicleModel(request.getVehicleModel());
        vehicleInsurance.setVehicleYear(request.getVehicleYear());
        vehicleInsurance.setEngineNumber(request.getEngineNumber());
        
        return vehicleInsurance;
    }

    private HealthInsurance mapToHealthInsurance(InsurancePolicyRequest request, User user) {
        HealthInsurance healthInsurance = new HealthInsurance();
        healthInsurance.setInsuranceType(InsuranceType.HEALTH);
        healthInsurance.setPremiumAmount(request.getPremiumAmount());
        healthInsurance.setCoverageAmount(request.getCoverageAmount());
        healthInsurance.setPolicyStartDate(request.getPolicyStartDate());
        healthInsurance.setPolicyEndDate(request.getPolicyEndDate());
        healthInsurance.setIsNewPolicy(request.getIsNewPolicy());
        healthInsurance.setUser(user);
        healthInsurance.setPrimaryPolicyHolder(user);
        healthInsurance.setPolicyType(request.getPolicyType());
        healthInsurance.setPreExistingConditions(request.getPreExistingConditions());
        healthInsurance.setHospitalNetwork(request.getHospitalNetwork());
        healthInsurance.setRoomRentLimit(request.getRoomRentLimit());
        healthInsurance.setAmbulanceCover(request.getAmbulanceCover());
        
        return healthInsurance;
    }

    private TermLifeInsurance mapToTermLifeInsurance(InsurancePolicyRequest request, User user) {
        TermLifeInsurance termLifeInsurance = new TermLifeInsurance();
        termLifeInsurance.setInsuranceType(InsuranceType.TERM_LIFE);
        termLifeInsurance.setPremiumAmount(request.getPremiumAmount());
        termLifeInsurance.setCoverageAmount(request.getCoverageAmount());
        termLifeInsurance.setPolicyStartDate(request.getPolicyStartDate());
        termLifeInsurance.setPolicyEndDate(request.getPolicyEndDate());
        termLifeInsurance.setIsNewPolicy(request.getIsNewPolicy());
        termLifeInsurance.setUser(user);
        termLifeInsurance.setPrimaryPolicyHolder(user);
        termLifeInsurance.setNomineeName(request.getNomineeName());
        termLifeInsurance.setNomineePhone(request.getNomineePhone());
        termLifeInsurance.setNomineeEmail(request.getNomineeEmail());
        termLifeInsurance.setNomineeRelation(request.getNomineeRelation());
        termLifeInsurance.setTermYears(request.getTermYears());
        termLifeInsurance.setMedicalReportRequired(request.getMedicalReportRequired());
        termLifeInsurance.setCriticalIllnessCover(request.getCriticalIllnessCover());
        termLifeInsurance.setAccidentalDeathBenefit(request.getAccidentalDeathBenefit());
        
        return termLifeInsurance;
    }
}