package com.insurance.util;

import java.util.Random;

public class PolicyNumberGenerator {
    
    private static final Random random = new Random();
    
    public static String generatePolicyNumber() {
        int number = 100000000 + random.nextInt(900000000);
        return "POL" + number;
    }
    
    public static String generateClaimNumber() {
        int number = 100000 + random.nextInt(900000);
        return "CLM" + number;
    }
}