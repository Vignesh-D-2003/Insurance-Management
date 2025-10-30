-- H2 Database Schema for Insurance Management System

-- Create Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100),
    address VARCHAR(200),
    phone_number VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create Insurance Policies table
CREATE TABLE insurance_policies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    insurance_type VARCHAR(50) NOT NULL,
    premium_amount DOUBLE NOT NULL,
    coverage_amount DOUBLE NOT NULL,
    policy_start_date TIMESTAMP NOT NULL,
    policy_end_date TIMESTAMP NOT NULL,
    is_new_policy BOOLEAN,
    policy_status VARCHAR(50),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Vehicle Insurance table
CREATE TABLE vehicle_insurance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) NOT NULL,
    chassis_number VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL,
    vehicle_make VARCHAR(100),
    vehicle_model VARCHAR(100),
    vehicle_year INT,
    engine_number VARCHAR(20),
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Health Insurance table
CREATE TABLE health_insurance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_type VARCHAR(50),
    pre_existing_conditions TEXT,
    hospital_network TEXT,
    room_rent_limit DOUBLE,
    ambulance_cover BOOLEAN,
    primary_policy_holder_id BIGINT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (primary_policy_holder_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Term Life Insurance table
CREATE TABLE term_life_insurance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nominee_name VARCHAR(100) NOT NULL,
    nominee_phone VARCHAR(20),
    nominee_email VARCHAR(100),
    nominee_relation VARCHAR(50),
    term_years INT NOT NULL,
    medical_report_required BOOLEAN,
    critical_illness_cover BOOLEAN,
    accidental_death_benefit BOOLEAN,
    primary_policy_holder_id BIGINT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (primary_policy_holder_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Family Members table
CREATE TABLE family_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_name VARCHAR(100) NOT NULL,
    member_phone VARCHAR(20),
    member_email VARCHAR(100),
    relation VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    medical_conditions TEXT,
    health_insurance_id BIGINT,
    FOREIGN KEY (health_insurance_id) REFERENCES health_insurance(id)
);

-- Create Claims table
CREATE TABLE claims (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_number VARCHAR(50) UNIQUE NOT NULL,
    policy_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    claim_description VARCHAR(500) NOT NULL,
    claim_amount DOUBLE NOT NULL,
    claim_date TIMESTAMP NOT NULL,
    incident_date TIMESTAMP,
    incident_location VARCHAR(200),
    supporting_documents TEXT,
    claim_status VARCHAR(50) NOT NULL,
    admin_remarks VARCHAR(500),
    processed_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    FOREIGN KEY (policy_id) REFERENCES insurance_policies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_policies_user_id ON insurance_policies(user_id);
CREATE INDEX idx_policies_policy_number ON insurance_policies(policy_number);
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_policy_id ON claims(policy_id);
CREATE INDEX idx_claims_status ON claims(claim_status);
CREATE INDEX idx_vehicle_vehicle_number ON vehicle_insurance(vehicle_number);
CREATE INDEX idx_vehicle_chassis_number ON vehicle_insurance(chassis_number);