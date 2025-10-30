# Insurance Management System - Angular Frontend

A comprehensive Angular 20 frontend application for managing insurance policies and claims.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login and registration with JWT tokens
- **Dashboard**: Overview of policies and claims statistics
- **Policy Management**: Create, view, and download insurance policies
- **Claims Management**: Submit and track insurance claims
- **Admin Panel**: Administrative interface for managing claims and policies

### Insurance Types Supported
1. **Motorcycle Insurance** - Vehicle details, VIN, registration
2. **Car Insurance** - Vehicle details, VIN, registration  
3. **Health Insurance** - Policy holder + family members
4. **Term Life Insurance** - Policy holder + beneficiaries

### User Roles
- **Customer**: Create policies, submit claims, view personal data
- **Admin**: Approve/reject claims, manage all policies, system monitoring

## 🛠️ Technology Stack

- **Framework**: Angular 20 (Standalone Components)
- **UI Library**: Bootstrap 5
- **HTTP Client**: Angular HTTP Client
- **Routing**: Angular Router
- **State Management**: JWT-based authentication
- **TypeScript**: Full type safety

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Java Spring Boot backend running on http://localhost:8080

### Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   ng serve
   ```

3. **Access the application**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080

## 🔐 Default Accounts

### Admin User
- **Username**: admin
- **Password**: admin123
- **Access**: Full administrative privileges

### Customer User  
- **Username**: john_doe
- **Password**: password
- **Access**: Customer features only

## 📱 Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Authentication component
│   │   ├── dashboard/       # Main dashboard
│   │   ├── policies/        # Policy management
│   │   ├── claims/          # Claims management
│   │   └── admin/           # Admin panel
│   ├── services/            # API services
│   ├── models/              # TypeScript interfaces
│   ├── guards/              # Route guards
│   └── app.routes.ts        # Application routing
├── styles.css               # Global styles
└── index.html               # Main HTML
```

## 🌐 API Integration

The frontend integrates with a Spring Boot backend REST API:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Policy Endpoints  
- `GET /api/policies/my-policies` - Get user policies
- `POST /api/policies` - Create new policy
- `GET /api/policies/{id}/download` - Download policy PDF

### Claims Endpoints
- `GET /api/claims/my-claims` - Get user claims
- `POST /api/claims` - Submit new claim
- `PUT /api/claims/{id}` - Update claim status (admin)

### Admin Endpoints
- `GET /api/policies` - Get all policies
- `GET /api/claims` - Get all claims

## 🎨 UI Features

### Responsive Design
- Mobile-first approach
- Bootstrap 5 responsive grid
- Touch-friendly interface

### User Experience
- Clean, modern interface
- Intuitive navigation
- Real-time form validation
- Loading states and error handling
- PDF download functionality

### Accessibility
- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🔧 Development

### Building for Production
```bash
ng build --configuration production
```

### Running Tests
```bash
ng test
```

### Linting
```bash
ng lint
```

## 📋 Key Components

### LoginComponent
- User login and registration
- JWT token management
- Form validation

### DashboardComponent  
- Statistics overview
- Quick action navigation
- Role-based UI

### PolicyFormComponent
- Dynamic forms for different insurance types
- Real-time validation
- Policy creation workflow

### AdminPanelComponent
- Claims management interface
- Bulk operations
- Status updates

## 🔒 Security Features

- JWT-based authentication
- Route guards for protected pages
- Role-based access control
- Secure API communication
- Token expiration handling

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- Static hosting (Vercel, Netlify)
- Docker containers
- Cloud platforms (AWS, Azure, GCP)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the documentation
- Review the API endpoints
- Verify backend connectivity
- Check browser console for errors

---

**Note**: This frontend requires the corresponding Spring Boot backend to be running for full functionality.