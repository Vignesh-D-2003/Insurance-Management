package com.insurance.controller;

import com.insurance.dto.DashboardStats;
import com.insurance.service.ClaimService;
import com.insurance.service.InsurancePolicyService;
import com.insurance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StatisticsController {
    
    @Autowired
    private InsurancePolicyService policyService;
    
    @Autowired
    private ClaimService claimService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(DashboardStats.builder()
            .totalPolicies(policyService.getTotalPoliciesCount())
            .totalAmountSettled(claimService.getTotalSettledAmount())
            .totalCustomers(userService.getTotalCustomersCount())
            .claimSuccessRate(claimService.getSuccessRate())
            .build());
    }
}