import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="welcome-header mb-4">
            <h1 class="display-6 fw-bold">Welcome back, {{ currentUser?.firstName || currentUser?.username }}!</h1>
            <p class="text-muted">Here's your insurance overview</p>
          </div>
          
          <div class="row g-4 mb-5">
            <div class="col-lg-3 col-md-6">
              <div class="stat-card card border-0 h-100">
                <div class="card-body text-center">
                  <div class="stat-icon bg-primary">
                    <i class="bi bi-shield-check"></i>
                  </div>
                  <h3 class="stat-number text-primary">{{ policyCount }}</h3>
                  <p class="stat-label">Total Policies</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="stat-card card border-0 h-100">
                <div class="card-body text-center">
                  <div class="stat-icon bg-warning">
                    <i class="bi bi-clipboard-check"></i>
                  </div>
                  <h3 class="stat-number text-warning">{{ claimCount }}</h3>
                  <p class="stat-label">Total Claims</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="stat-card card border-0 h-100">
                <div class="card-body text-center">
                  <div class="stat-icon bg-success">
                    <i class="bi bi-check-circle"></i>
                  </div>
                  <h3 class="stat-number text-success">{{ activePolicies }}</h3>
                  <p class="stat-label">Active Policies</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="stat-card card border-0 h-100">
                <div class="card-body text-center">
                  <div class="stat-icon bg-info">
                    <i class="bi bi-clock-history"></i>
                  </div>
                  <h3 class="stat-number text-info">{{ pendingClaims }}</h3>
                  <p class="stat-label">Pending Claims</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card border-0 shadow-sm">
                <div class="card-header bg-transparent">
                  <h4 class="mb-0"><i class="bi bi-lightning-charge"></i> Quick Actions</h4>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-md-6 col-lg-3">
                      <button class="action-btn btn btn-outline-primary w-100" (click)="navigateToPolicies()">
                        <i class="bi bi-shield-check"></i>
                        <span>Manage Policies</span>
                      </button>
                    </div>
                    <div class="col-md-6 col-lg-3">
                      <button class="action-btn btn btn-outline-warning w-100" (click)="navigateToClaims()">
                        <i class="bi bi-clipboard-check"></i>
                        <span>Manage Claims</span>
                      </button>
                    </div>
                    <div class="col-md-6 col-lg-3" *ngIf="!isAdmin">
                      <button class="action-btn btn btn-outline-success w-100" (click)="createNewPolicy()">
                        <i class="bi bi-plus-circle"></i>
                        <span>New Policy</span>
                      </button>
                    </div>
                    <div class="col-md-6 col-lg-3" *ngIf="isAdmin">
                      <button class="action-btn btn btn-outline-danger w-100" (click)="navigateToAdmin()">
                        <i class="bi bi-gear"></i>
                        <span>Admin Panel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
    }
    .stat-card {
      transition: all 0.3s ease;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      color: white;
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
    }
    .stat-label {
      color: #6c757d;
      font-weight: 500;
      margin: 0;
    }
    .action-btn {
      padding: 1rem;
      border-radius: 10px;
      border: 2px solid;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .action-btn i {
      font-size: 1.5rem;
    }
    .action-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    .card {
      border-radius: 15px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  policyCount = 0;
  claimCount = 0;
  activePolicies = 0;
  pendingClaims = 0;
  isAdmin = false;
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load dashboard statistics
    // This would typically call API endpoints to get real data
    this.policyCount = 3;
    this.claimCount = 2;
    this.activePolicies = 2;
    this.pendingClaims = 1;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToPolicies(): void {
    this.router.navigate(['/policies']);
  }

  navigateToClaims(): void {
    this.router.navigate(['/claims']);
  }

  createNewPolicy(): void {
    this.router.navigate(['/policies/create']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}