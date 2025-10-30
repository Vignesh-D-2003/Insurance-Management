package com.insurance.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Password for 'vignesh2003': " + encoder.encode("vignesh2003"));
        System.out.println("Password for 'password': " + encoder.encode("password"));
        System.out.println("Password for 'admin123': " + encoder.encode("admin123"));
    }
}
