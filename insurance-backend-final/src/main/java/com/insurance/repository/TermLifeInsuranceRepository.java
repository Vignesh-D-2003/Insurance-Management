package com.insurance.repository;

import com.insurance.entity.TermLifeInsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermLifeInsuranceRepository extends JpaRepository<TermLifeInsurance, Long> {
    List<TermLifeInsurance> findByUserId(Long userId);
    List<TermLifeInsurance> findByPrimaryPolicyHolderId(Long primaryPolicyHolderId);
}