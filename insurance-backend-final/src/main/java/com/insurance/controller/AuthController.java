package com.insurance.controller;

import com.insurance.dto.JwtResponse;
import com.insurance.dto.LoginRequest;
import com.insurance.dto.MessageResponse;
import com.insurance.dto.SignUpRequest;
import com.insurance.entity.User;
import com.insurance.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String jwt = authService.authenticateUser(loginRequest);
        User user = authService.getCurrentUser();
        
        return ResponseEntity.ok(new JwtResponse(
                jwt, "Bearer", user.getId(), user.getUsername(), 
                user.getEmail(), user.getRole(), user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            String jwt = authService.authenticateUser(loginRequest);
            User user = authService.getCurrentUser();
            
            return ResponseEntity.ok(new JwtResponse(
                    jwt, "Bearer", user.getId(), user.getUsername(), 
                    user.getEmail(), user.getRole(), user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(new MessageResponse("Invalid username or password"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            User user = authService.registerUser(signUpRequest);
            String jwt = authService.generateTokenForUser(user);
            
            return ResponseEntity.ok(new JwtResponse(
                    jwt, "Bearer", user.getId(), user.getUsername(), 
                    user.getEmail(), user.getRole(), user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody SignUpRequest updateRequest) {
        try {
            User updatedUser = authService.updateUserProfile(updateRequest);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}