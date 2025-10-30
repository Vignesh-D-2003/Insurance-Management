package com.insurance.service;

import com.insurance.dto.PaymentRequest;
import com.insurance.dto.PaymentResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {

    public PaymentResponse processPayment(PaymentRequest request) {
        // Mock payment processing logic
        String transactionId = "TXN_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        // Simulate payment processing delay
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Mock success/failure based on card number
        boolean isSuccess = !request.getCardNumber().endsWith("0000");
        
        String status = isSuccess ? "SUCCESS" : "FAILED";
        String message = isSuccess ? 
            "Payment processed successfully" : 
            "Payment failed. Please check your card details.";
        
        return new PaymentResponse(
            transactionId,
            status,
            message,
            request.getAmount(),
            LocalDateTime.now(),
            request.getPolicyId()
        );
    }

    public PaymentResponse mockSuccessPayment(PaymentRequest request) {
        String transactionId = "TXN_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        return new PaymentResponse(
            transactionId,
            "SUCCESS",
            "Mock payment processed successfully",
            request.getAmount(),
            LocalDateTime.now(),
            request.getPolicyId()
        );
    }

    public PaymentResponse mockFailurePayment(PaymentRequest request) {
        String transactionId = "TXN_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        return new PaymentResponse(
            transactionId,
            "FAILED",
            "Mock payment failed for testing purposes",
            request.getAmount(),
            LocalDateTime.now(),
            request.getPolicyId()
        );
    }
}