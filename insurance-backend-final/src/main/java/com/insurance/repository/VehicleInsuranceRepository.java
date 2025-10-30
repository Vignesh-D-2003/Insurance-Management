package com.insurance.repository;

import com.insurance.entity.VehicleInsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleInsuranceRepository extends JpaRepository<VehicleInsurance, Long> {
    List<VehicleInsurance> findByUserId(Long userId);
    Optional<VehicleInsurance> findByVehicleNumber(String vehicleNumber);
    Optional<VehicleInsurance> findByChassisNumber(String chassisNumber);
}