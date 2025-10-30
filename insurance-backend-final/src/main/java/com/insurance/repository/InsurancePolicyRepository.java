package com.insurance.repository;

import com.insurance.entity.InsurancePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InsurancePolicyRepository extends JpaRepository<InsurancePolicy, Long> {
    List<InsurancePolicy> findByUserId(Long userId);
    Optional<InsurancePolicy> findByPolicyNumber(String policyNumber);
    
    @Query("SELECT p FROM InsurancePolicy p WHERE p.insuranceType = :type AND p.user.id = :userId")
    List<InsurancePolicy> findByInsuranceTypeAndUserId(@Param("type") String type, @Param("userId") Long userId);
    
    @Query("SELECT p FROM InsurancePolicy p WHERE p.policyStatus = :status")
    List<InsurancePolicy> findByPolicyStatus(@Param("status") String status);
}