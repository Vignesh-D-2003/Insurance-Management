# Insurance Management System

A comprehensive Spring Boot backend for managing insurance policies and claims with role-based access control.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/Customer)
- Secure password hashing with BCrypt

### Insurance Types
- **Bike Insurance**: Vehicle details, chassis number, registration date
- **Car Insurance**: Vehicle details, chassis number, registration date  
- **Health Insurance**: Primary policy holder + family members
- **Term Life Insurance**: Primary policy holder + nominee details

### Core Functionality
- Customer registration and login
- Policy creation and management
- Claim submission and processing
- PDF policy document generation
- Admin dashboard for managing policies and claims

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security with JWT
- **Database**: H2 (In-memory)
- **PDF Generation**: iText 7
- **Build Tool**: Maven
- **Java Version**: 17

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Insurance Policies
- `POST /api/policies` - Create new policy
- `GET /api/policies/my-policies` - Get user policies
- `GET /api/policies/{id}` - Get policy by ID
- `GET /api/policies/{id}/document` - Download policy PDF

### Claims
- `POST /api/claims` - Submit new claim
- `GET /api/claims/my-claims` - Get user claims
- `GET /api/claims/pending` - Get pending claims (Admin)
- `PUT /api/claims/{id}` - Update claim status (Admin)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get statistics

## Database Schema

The system uses the following main entities:
- **Users**: Customer and admin accounts
- **InsurancePolicies**: Base policy information
- **VehicleInsurance**: Bike/Car specific details
- **HealthInsurance**: Health insurance specific details
- **TermLifeInsurance**: Term life insurance specific details
- **FamilyMembers**: Dependents for health insurance
- **Claims**: Insurance claims and their status

## Running the Application

1. Clone the repository
2. Run with Maven: `mvn spring-boot:run`
3. Access H2 Console: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:insurance_db`
   - Username: `sa`
   - Password: `password`

## Default Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Customer**: username: `john_doe`, password: `password`

## Frontend Integration

The API is designed to work with Angular 20 frontend. All endpoints support CORS and return JSON responses suitable for SPA consumption.

## Security Features

- JWT token-based authentication
- Role-based authorization
- Password encryption
- CORS configuration
- Input validation

## PDF Generation

Policy documents are automatically generated in PDF format with:
- Policy details
- Policyholder information
- Type-specific coverage details
- Professional formatting