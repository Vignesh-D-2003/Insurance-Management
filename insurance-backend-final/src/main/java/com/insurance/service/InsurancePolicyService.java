package com.insurance.service;

import com.insurance.dto.InsurancePolicyRequest;
import com.insurance.entity.*;
import com.insurance.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class InsurancePolicyService {

    @Autowired
    private InsurancePolicyRepository policyRepository;

    @Autowired
    private VehicleInsuranceRepository vehicleInsuranceRepository;

    @Autowired
    private HealthInsuranceRepository healthInsuranceRepository;

    @Autowired
    private TermLifeInsuranceRepository termLifeInsuranceRepository;

    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    @Autowired
    private AuthService authService;

    public InsurancePolicy createPolicy(InsurancePolicyRequest request) {
        User currentUser = authService.getCurrentUser();
        InsurancePolicy policy;

        if (request.getInsuranceType() == null) {
            throw new RuntimeException("Insurance type is required");
        }

        switch (request.getInsuranceType()) {
            case BIKE:
            case CAR:
                policy = createVehicleInsurance(request, currentUser);
                break;
            case HEALTH:
                policy = createHealthInsurance(request, currentUser);
                break;
            case TERM_LIFE:
                policy = createTermLifeInsurance(request, currentUser);
                break;
            default:
                throw new RuntimeException("Invalid insurance type: " + request.getInsuranceType());
        }

        return policy;
    }

    public List<InsurancePolicy> getUserPolicies() {
        User currentUser = authService.getCurrentUser();
        return policyRepository.findByUserId(currentUser.getId());
    }

    public List<InsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public InsurancePolicy getPolicyById(Long policyId) {
        return policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
    }

    private VehicleInsurance createVehicleInsurance(InsurancePolicyRequest request, User user) {
        VehicleInsurance vehicleInsurance = new VehicleInsurance();
        vehicleInsurance.setPolicyNumber(generatePolicyNumber());
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

        return vehicleInsuranceRepository.save(vehicleInsurance);
    }

    private HealthInsurance createHealthInsurance(InsurancePolicyRequest request, User user) {
        HealthInsurance healthInsurance = new HealthInsurance();
        healthInsurance.setPolicyNumber(generatePolicyNumber());
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

        return healthInsuranceRepository.save(healthInsurance);
    }

    private TermLifeInsurance createTermLifeInsurance(InsurancePolicyRequest request, User user) {
        TermLifeInsurance termLifeInsurance = new TermLifeInsurance();
        termLifeInsurance.setPolicyNumber(generatePolicyNumber());
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

        return termLifeInsuranceRepository.save(termLifeInsurance);
    }

    private String generatePolicyNumber() {
        Random random = new Random();
        int number = 100000000 + random.nextInt(900000000);
        return "POL" + number;
    }
    
    public Long getTotalPoliciesCount() {
        return policyRepository.count();
    }
}