package com.insurance.service;

import com.insurance.dto.FamilyMemberRequest;
import com.insurance.entity.FamilyMember;
import com.insurance.entity.HealthInsurance;
import com.insurance.repository.FamilyMemberRepository;
import com.insurance.repository.HealthInsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyMemberService {

    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    @Autowired
    private HealthInsuranceRepository healthInsuranceRepository;

    public FamilyMember addFamilyMember(FamilyMemberRequest request, Long healthInsuranceId) {
        HealthInsurance healthInsurance = healthInsuranceRepository.findById(healthInsuranceId)
                .orElseThrow(() -> new RuntimeException("Health insurance not found"));

        FamilyMember familyMember = new FamilyMember();
        familyMember.setMemberName(request.getMemberName());
        familyMember.setMemberPhone(request.getMemberPhone());
        familyMember.setMemberEmail(request.getMemberEmail());
        familyMember.setRelation(request.getRelation());
        familyMember.setDateOfBirth(request.getDateOfBirth());
        familyMember.setGender(request.getGender());
        familyMember.setMedicalConditions(request.getMedicalConditions());
        familyMember.setHealthInsurance(healthInsurance);

        return familyMemberRepository.save(familyMember);
    }

    public List<FamilyMember> getFamilyMembersByHealthInsurance(Long healthInsuranceId) {
        return familyMemberRepository.findByHealthInsuranceId(healthInsuranceId);
    }

    public void deleteFamilyMember(Long memberId) {
        familyMemberRepository.deleteById(memberId);
    }
}