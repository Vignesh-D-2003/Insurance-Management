package com.insurance.repository;

import com.insurance.entity.HealthInsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthInsuranceRepository extends JpaRepository<HealthInsurance, Long> {
    List<HealthInsurance> findByUserId(Long userId);
    List<HealthInsurance> findByPrimaryPolicyHolderId(Long primaryPolicyHolderId);
}