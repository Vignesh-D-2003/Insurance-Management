-- Sample Data for Insurance Management System

-- Insert Admin User (password: admin123)
INSERT INTO users (username, email, password, full_name, father_name, address, phone_number, role, created_at) VALUES
('admin', 'admin@insurance.com', '$2a$10$1bZLO2elrCSjCfO2wv6QvevqTttDFwbbZYMiZDaczg9j6wx8qSeeu', 'System Administrator', 'Admin Father', '123 Admin Street, Mumbai', '9876543210', 'ADMIN', CURRENT_TIMESTAMP);

-- Insert Sample Customers (password: password for john_doe and jane_smith, vignesh2003 for vignesh)
INSERT INTO users (username, email, password, full_name, father_name, address, phone_number, role, created_at) VALUES
('john_doe', 'john@example.com', '$2a$10$m7gta7UCW8bRi9dLQm8d3.lQ5.1CDDIHG51MFUrU9UHgB8TI8fFb.', 'John Doe', 'Robert Doe', '456 Park Avenue, Delhi', '9876543211', 'CUSTOMER', CURRENT_TIMESTAMP),
('jane_smith', 'jane@example.com', '$2a$10$m7gta7UCW8bRi9dLQm8d3.lQ5.1CDDIHG51MFUrU9UHgB8TI8fFb.', 'Jane Smith', 'Michael Smith', '789 Oak Street, Bangalore', '9876543212', 'CUSTOMER', CURRENT_TIMESTAMP),
('vignesh', 'vignesh2003@gmail.com', '$2a$10$3jBC6EYfWfFM4Sp3T1rLre7s7FtlGtOBfhKHkK51wOenuwdJH2tem', 'Vignesh', 'Vignesh Father', 'Chennai, Tamil Nadu', '8870996008', 'CUSTOMER', CURRENT_TIMESTAMP);

-- Insert Sample Insurance Policies
INSERT INTO insurance_policies (policy_number, insurance_type, premium_amount, coverage_amount, policy_start_date, policy_end_date, is_new_policy, policy_status, created_at, user_id) VALUES
('POL001', 'CAR', 15000.00, 500000.00, '2024-01-01', '2025-01-01', true, 'ACTIVE', CURRENT_TIMESTAMP, 2);

INSERT INTO insurance_policies (policy_number, insurance_type, premium_amount, coverage_amount, policy_start_date, policy_end_date, is_new_policy, policy_status, created_at, user_id) VALUES
('POL002', 'HEALTH', 25000.00, 1000000.00, '2024-01-15', '2025-01-15', true, 'PENDING_APPROVAL', CURRENT_TIMESTAMP, 2);

-- Insert Sample Claims
INSERT INTO claims (claim_number, policy_id, user_id, claim_description, claim_amount, claim_date, incident_date, incident_location, claim_status, created_at) VALUES
('CLM001', 1, 2, 'Minor accident damage', 25000.00, CURRENT_TIMESTAMP, '2024-03-01', 'MG Road, Bangalore', 'APPROVED', CURRENT_TIMESTAMP);

