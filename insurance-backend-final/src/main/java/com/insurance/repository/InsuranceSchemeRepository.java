package com.insurance.repository;

import com.insurance.entity.InsuranceScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceSchemeRepository extends JpaRepository<InsuranceScheme, Long> {
}