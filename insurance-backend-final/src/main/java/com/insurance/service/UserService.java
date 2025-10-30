package com.insurance.service;

import com.insurance.entity.User;
import com.insurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User updateUserProfile(String username, User userUpdate) {
        User existingUser = getUserByUsername(username);
        
        if (userUpdate.getFullName() != null) {
            existingUser.setFullName(userUpdate.getFullName());
        }
        if (userUpdate.getFatherName() != null) {
            existingUser.setFatherName(userUpdate.getFatherName());
        }
        if (userUpdate.getAddress() != null) {
            existingUser.setAddress(userUpdate.getAddress());
        }
        if (userUpdate.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(userUpdate.getPhoneNumber());
        }
        if (userUpdate.getEmail() != null && !userUpdate.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.existsByEmail(userUpdate.getEmail())) {
                throw new RuntimeException("Email is already in use");
            }
            existingUser.setEmail(userUpdate.getEmail());
        }
        
        return userRepository.save(existingUser);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User updateUser(Long id, User userUpdate) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (userUpdate.getFullName() != null) {
            existingUser.setFullName(userUpdate.getFullName());
        }
        if (userUpdate.getFatherName() != null) {
            existingUser.setFatherName(userUpdate.getFatherName());
        }
        if (userUpdate.getAddress() != null) {
            existingUser.setAddress(userUpdate.getAddress());
        }
        if (userUpdate.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(userUpdate.getPhoneNumber());
        }
        if (userUpdate.getEmail() != null && !userUpdate.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.existsByEmail(userUpdate.getEmail())) {
                throw new RuntimeException("Email is already in use");
            }
            existingUser.setEmail(userUpdate.getEmail());
        }
        if (userUpdate.getRole() != null) {
            existingUser.setRole(userUpdate.getRole());
        }
        
        return userRepository.save(existingUser);
    }
    
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Add isActive field to User entity or use role to mark as inactive
        user.setRole("INACTIVE");
        userRepository.save(user);
    }
    
    public void activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("CUSTOMER");
        userRepository.save(user);
    }
    
    public Long getTotalCustomersCount() {
        return userRepository.count();
    }
    
    public User getAdminUser() {
        return userRepository.findByUsername("admin")
                .orElseThrow(() -> new RuntimeException("Admin user not found"));
    }
}