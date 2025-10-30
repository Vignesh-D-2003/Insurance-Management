package com.insurance.service;

import com.insurance.entity.InsuranceScheme;
import com.insurance.repository.InsuranceSchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsuranceSchemeService {
    
    @Autowired
    private InsuranceSchemeRepository schemeRepository;
    
    public List<InsuranceScheme> getAllSchemes() {
        return schemeRepository.findAll();
    }
    
    public InsuranceScheme createScheme(InsuranceScheme scheme) {
        return schemeRepository.save(scheme);
    }
    
    public InsuranceScheme updateScheme(Long id, InsuranceScheme schemeUpdate) {
        InsuranceScheme existingScheme = schemeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scheme not found"));
        
        existingScheme.setName(schemeUpdate.getName());
        existingScheme.setDescription(schemeUpdate.getDescription());
        existingScheme.setMinPremium(schemeUpdate.getMinPremium());
        existingScheme.setMaxPremium(schemeUpdate.getMaxPremium());
        existingScheme.setMaxCoverage(schemeUpdate.getMaxCoverage());
        
        return schemeRepository.save(existingScheme);
    }
    
    public void toggleSchemeStatus(Long id) {
        InsuranceScheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scheme not found"));
        
        scheme.setActive(!scheme.isActive());
        schemeRepository.save(scheme);
    }
}