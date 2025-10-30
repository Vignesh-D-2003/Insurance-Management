package com.insurance.service;

import com.insurance.dto.LoginRequest;
import com.insurance.dto.SignUpRequest;
import com.insurance.entity.User;
import com.insurance.repository.UserRepository;
import com.insurance.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    public String authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        return jwtTokenUtil.generateToken(userDetails);
    }

    public User registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFullName(signUpRequest.getFullName() != null ? signUpRequest.getFullName() : signUpRequest.getUsername());
        user.setFatherName(signUpRequest.getFatherName());
        user.setAddress(signUpRequest.getAddress());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setRole(signUpRequest.getRole());

        return userRepository.save(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String generateTokenForUser(User user) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        return jwtTokenUtil.generateToken(userDetails);
    }
    
    public User getOrCreateAdminUser() {
        return userRepository.findByUsername("admin")
                .orElseGet(() -> {
                    User admin = new User();
                    admin.setUsername("admin");
                    admin.setEmail("admin@insurance.com");
                    admin.setPassword(passwordEncoder.encode("admin123"));
                    admin.setFullName("System Administrator");
                    admin.setRole("ADMIN");
                    return userRepository.save(admin);
                });
    }

    public User updateUserProfile(SignUpRequest updateRequest) {
        User currentUser = getCurrentUser();
        
        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(currentUser.getEmail())) {
            if (userRepository.existsByEmail(updateRequest.getEmail())) {
                throw new RuntimeException("Email is already in use!");
            }
            currentUser.setEmail(updateRequest.getEmail());
        }
        
        if (updateRequest.getFullName() != null) {
            currentUser.setFullName(updateRequest.getFullName());
        }
        if (updateRequest.getFatherName() != null) {
            currentUser.setFatherName(updateRequest.getFatherName());
        }
        if (updateRequest.getAddress() != null) {
            currentUser.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getPhoneNumber() != null) {
            currentUser.setPhoneNumber(updateRequest.getPhoneNumber());
        }
        if (updateRequest.getPassword() != null && !updateRequest.getPassword().isEmpty()) {
            currentUser.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
        }
        
        return userRepository.save(currentUser);
    }
}