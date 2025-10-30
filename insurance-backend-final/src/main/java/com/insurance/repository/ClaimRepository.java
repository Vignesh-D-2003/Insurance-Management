package com.insurance.repository;

import com.insurance.entity.Claim;
import com.insurance.entity.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUserId(Long userId);
    List<Claim> findByClaimStatus(String claimStatus);
    Optional<Claim> findByClaimNumber(String claimNumber);
    
    @Query("SELECT c FROM Claim c WHERE c.policy.id = :policyId")
    List<Claim> findByPolicyId(@Param("policyId") Long policyId);
    
    @Query("SELECT c FROM Claim c WHERE c.claimStatus = :status ORDER BY c.createdAt DESC")
    List<Claim> findByClaimStatusOrderByCreatedAtDesc(@Param("status") String status);
    
    List<Claim> findByClaimStatus(ClaimStatus claimStatus);
    long countByClaimStatus(ClaimStatus claimStatus);
}