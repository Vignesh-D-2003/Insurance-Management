package com.insurance.dto;

import java.time.LocalDateTime;

public class PaymentResponse {
    private String transactionId;
    private String status;
    private String message;
    private Double amount;
    private LocalDateTime timestamp;
    private Long policyId;

    // Constructors
    public PaymentResponse() {}

    public PaymentResponse(String transactionId, String status, String message, 
                          Double amount, LocalDateTime timestamp, Long policyId) {
        this.transactionId = transactionId;
        this.status = status;
        this.message = message;
        this.amount = amount;
        this.timestamp = timestamp;
        this.policyId = policyId;
    }

    // Getters and Setters
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Long getPolicyId() { return policyId; }
    public void setPolicyId(Long policyId) { this.policyId = policyId; }
}