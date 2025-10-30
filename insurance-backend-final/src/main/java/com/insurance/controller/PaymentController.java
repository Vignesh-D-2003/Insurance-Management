package com.insurance.controller;

import com.insurance.dto.PaymentRequest;
import com.insurance.dto.PaymentResponse;
import com.insurance.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<PaymentResponse> processPayment(@Valid @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.processPayment(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mock-success")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<PaymentResponse> mockSuccessPayment(@Valid @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.mockSuccessPayment(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mock-failure")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<PaymentResponse> mockFailurePayment(@Valid @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.mockFailurePayment(request);
        return ResponseEntity.ok(response);
    }
}