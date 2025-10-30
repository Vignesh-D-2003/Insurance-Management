import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest, SignUpRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-container">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Insurance Management System</h3>
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link" [class.active]="!showSignup" (click)="showSignup = false">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" [class.active]="showSignup" (click)="showSignup = true">Sign Up</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <!-- Login Form -->
              <div *ngIf="!showSignup">
                <form (ngSubmit)="onLogin()">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" [(ngModel)]="loginRequest.username" name="username" required>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" [(ngModel)]="loginRequest.password" name="password" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
              </div>

              <!-- Signup Form -->
              <div *ngIf="showSignup">
                <form (ngSubmit)="onSignup()">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="firstName" [(ngModel)]="signupRequest.firstName" name="firstName" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="lastName" [(ngModel)]="signupRequest.lastName" name="lastName" required>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="signupUsername" class="form-label">Username</label>
                    <input type="text" class="form-control" id="signupUsername" [(ngModel)]="signupRequest.username" name="signupUsername" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" [(ngModel)]="signupRequest.email" name="email" required>
                  </div>
                  <div class="mb-3">
                    <label for="signupPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="signupPassword" [(ngModel)]="signupRequest.password" name="signupPassword" required>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" class="form-control" id="phone" [(ngModel)]="signupRequest.phone" name="phone" required>
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <textarea class="form-control" id="address" [(ngModel)]="signupRequest.address" name="address" required></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="dateOfBirth" class="form-label">Date of Birth</label>
                    <input type="date" class="form-control" id="dateOfBirth" [(ngModel)]="signupRequest.dateOfBirth" name="dateOfBirth" required>
                  </div>
                  <button type="submit" class="btn btn-success w-100">Sign Up</button>
                </form>
              </div>

              <div class="alert alert-danger mt-3" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>
            </div>
          </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-container {
      width: 100%;
      max-width: 500px;
    }
    .card {
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      border: none;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
    }
    .card-header {
      background: transparent;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      border-radius: 15px 15px 0 0 !important;
    }
    .nav-tabs .nav-link {
      border: none;
      color: #6c757d;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .nav-tabs .nav-link.active {
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
      border-radius: 8px;
      transform: translateY(-2px);
    }
    .form-control {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }
    .form-control:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
      transform: translateY(-1px);
    }
    .btn {
      border-radius: 10px;
      font-weight: 600;
      padding: 12px;
      transition: all 0.3s ease;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    .alert {
      border-radius: 10px;
      border: none;
    }
  `]
})
export class LoginComponent {
  showSignup = false;
  loginRequest: LoginRequest = { username: '', password: '' };
  signupRequest: SignUpRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    dateOfBirth: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        // Store user data from JWT response
        const userData = {
          id: response.id,
          username: response.username,
          email: response.email,
          role: response.role,
          firstName: response.user?.firstName || response.username,
          lastName: response.user?.lastName || '',
          phone: response.user?.phone || '',
          address: response.user?.address || '',
          dateOfBirth: response.user?.dateOfBirth || ''
        };
        localStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = `Login failed: ${error.error?.message || error.message || 'Unknown error'}`;
        }
      }
    });
  }

  onSignup(): void {
    this.errorMessage = '';
    this.authService.signup(this.signupRequest).subscribe({
      next: () => {
        this.showSignup = false;
        this.errorMessage = '';
        alert('Registration successful! Please login.');
      },
      error: (error) => {
        console.error('Signup error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080';
        } else {
          this.errorMessage = `Registration failed: ${error.error?.message || error.message || 'Please try again'}`;
        }
      }
    });
  }
}