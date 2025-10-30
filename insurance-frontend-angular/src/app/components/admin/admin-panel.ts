import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { InsuranceService } from '../../services/insurance.service';
import { Claim, ClaimUpdateRequest } from '../../models/claim.model';
import { InsurancePolicy } from '../../models/insurance.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <h2><i class="bi bi-gear"></i> Admin Panel</h2>
      
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'claims'" (click)="activeTab = 'claims'">Claims Management</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'policies'" (click)="activeTab = 'policies'">Policies Management</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'users'" (click)="activeTab = 'users'">User Management</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'schemes'" (click)="activeTab = 'schemes'">Insurance Schemes</a>
        </li>
      </ul>

      <!-- Claims Management -->
      <div class="mt-4" *ngIf="activeTab === 'claims'">
        <h3>Claims Review</h3>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Claim Number</th>
                <th>Customer</th>
                <th>Policy</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let claim of allClaims">
                <td>{{ claim.claimNumber }}</td>
                <td>User {{ claim.userId }}</td>
                <td>{{ claim.insurancePolicy?.policyNumber }}</td>
                <td>\${{ claim.claimAmount }}</td>
                <td>
                  <span class="badge" [class]="getClaimStatusClass(claim.status)">
                    {{ claim.status }}
                  </span>
                </td>
                <td>{{ formatDate(claim.claimDate) }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success" (click)="updateClaimStatus(claim.id, 'APPROVED')" 
                            [disabled]="claim.status === 'APPROVED'">Approve</button>
                    <button class="btn btn-sm btn-danger" (click)="updateClaimStatus(claim.id, 'REJECTED')" 
                            [disabled]="claim.status === 'REJECTED'">Reject</button>
                    <button class="btn btn-sm btn-info" (click)="updateClaimStatus(claim.id, 'UNDER_REVIEW')" 
                            [disabled]="claim.status === 'UNDER_REVIEW'">Review</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Policies Management -->
      <div class="mt-4" *ngIf="activeTab === 'policies'">
        <h3>All Policies</h3>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Policy Number</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Premium</th>
                <th>Coverage</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let policy of allPolicies">
                <td>{{ policy.policyNumber }}</td>
                <td>User {{ policy.userId }}</td>
                <td>{{ policy.policyType }}</td>
                <td>₹{{ policy.premium }}</td>
                <td>₹{{ policy.coverageAmount }}</td>
                <td>
                  <span class="badge" [class]="getPolicyStatusClass(policy.status)">
                    {{ policy.status }}
                  </span>
                </td>
                <td>{{ formatDate(policy.startDate) }}</td>
                <td>{{ formatDate(policy.endDate) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- User Management -->
      <div class="mt-4" *ngIf="activeTab === 'users'">
        <h3>User Management</h3>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of allUsers">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.firstName }} {{ user.lastName }}</td>
                <td>
                  <span class="badge" [class]="user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <span class="badge bg-success">Active</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-warning me-2" (click)="editUser(user)">Edit</button>
                  <button class="btn btn-sm btn-danger" (click)="deactivateUser(user.id)">Deactivate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Insurance Schemes Management -->
      <div class="mt-4" *ngIf="activeTab === 'schemes'">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Insurance Schemes</h3>
          <button class="btn btn-primary" (click)="addNewScheme()">Add New Scheme</button>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-4 mb-4" *ngFor="let scheme of insuranceSchemes">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ scheme.name }}</h5>
                <p class="card-text">{{ scheme.description }}</p>
                <div class="mb-2">
                  <strong>Premium Range:</strong> ₹{{ scheme.minPremium }} - ₹{{ scheme.maxPremium }}
                </div>
                <div class="mb-2">
                  <strong>Coverage:</strong> ₹{{ scheme.maxCoverage }}
                </div>
                <div class="mb-3">
                  <span class="badge" [class]="scheme.isActive ? 'bg-success' : 'bg-secondary'">
                    {{ scheme.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <div class="btn-group w-100">
                  <button class="btn btn-sm btn-outline-primary" (click)="editScheme(scheme)">Edit</button>
                  <button class="btn btn-sm" [class]="scheme.isActive ? 'btn-outline-danger' : 'btn-outline-success'" 
                          (click)="toggleSchemeStatus(scheme)">
                    {{ scheme.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge-PENDING { background-color: #ffc107; }
    .badge-APPROVED { background-color: #28a745; }
    .badge-REJECTED { background-color: #dc3545; }
    .badge-UNDER_REVIEW { background-color: #17a2b8; }
    .badge-ACTIVE { background-color: #28a745; }
    .badge-EXPIRED { background-color: #dc3545; }
    .badge-CANCELLED { background-color: #6c757d; }
    .btn-group .btn {
      margin-right: 2px;
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'claims';
  allClaims: Claim[] = [];
  allPolicies: InsurancePolicy[] = [];
  allUsers: any[] = [];
  insuranceSchemes: any[] = [];

  constructor(
    private claimService: ClaimService,
    private insuranceService: InsuranceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllClaims();
    this.loadAllPolicies();
    this.loadAllUsers();
    this.loadInsuranceSchemes();
  }

  loadAllClaims(): void {
    this.claimService.getAllClaims().subscribe({
      next: (data) => {
        this.allClaims = data;
      },
      error: (error) => {
        console.error('Error loading claims:', error);
      }
    });
  }

  loadAllPolicies(): void {
    this.insuranceService.getAllPolicies().subscribe({
      next: (data) => {
        this.allPolicies = data;
      },
      error: (error) => {
        console.error('Error loading policies:', error);
      }
    });
  }

  updateClaimStatus(claimId: number, status: string): void {
    const request: ClaimUpdateRequest = {
      status: status,
      reviewComments: `Status updated to ${status} by admin`
    };

    this.claimService.updateClaim(claimId, request).subscribe({
      next: () => {
        alert(`Claim status updated to ${status}`);
        this.loadAllClaims();
      },
      error: (error) => {
        console.error('Error updating claim:', error);
        alert('Failed to update claim status');
      }
    });
  }

  getClaimStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-PENDING';
      case 'APPROVED': return 'badge-APPROVED';
      case 'REJECTED': return 'badge-REJECTED';
      case 'UNDER_REVIEW': return 'badge-UNDER_REVIEW';
      default: return 'badge-secondary';
    }
  }

  getPolicyStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'badge-ACTIVE';
      case 'EXPIRED': return 'badge-EXPIRED';
      case 'CANCELLED': return 'badge-CANCELLED';
      default: return 'badge-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  loadAllUsers(): void {
    // Mock users data
    this.allUsers = [
      { id: 1, username: 'admin', email: 'admin@insuremax.com', firstName: 'System', lastName: 'Administrator', role: 'ADMIN' },
      { id: 2, username: 'john_doe', email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 'CUSTOMER' },
      { id: 3, username: 'jane_smith', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', role: 'CUSTOMER' }
    ];
  }

  loadInsuranceSchemes(): void {
    this.insuranceSchemes = [
      {
        id: 1,
        name: 'Comprehensive Car Insurance',
        description: 'Complete protection for your vehicle including third-party and own damage coverage',
        minPremium: 5000,
        maxPremium: 50000,
        maxCoverage: 1000000,
        isActive: true
      },
      {
        id: 2,
        name: 'Two Wheeler Insurance',
        description: 'Affordable insurance for motorcycles and scooters',
        minPremium: 1500,
        maxPremium: 15000,
        maxCoverage: 500000,
        isActive: true
      },
      {
        id: 3,
        name: 'Family Health Insurance',
        description: 'Comprehensive health coverage for entire family',
        minPremium: 8000,
        maxPremium: 80000,
        maxCoverage: 2000000,
        isActive: true
      },
      {
        id: 4,
        name: 'Term Life Insurance',
        description: 'Pure life insurance with high coverage at low premium',
        minPremium: 3000,
        maxPremium: 100000,
        maxCoverage: 5000000,
        isActive: false
      }
    ];
  }

  editUser(user: any): void {
    alert(`Edit user functionality for ${user.username}`);
  }

  deactivateUser(userId: number): void {
    if (confirm('Are you sure you want to deactivate this user?')) {
      alert(`User ${userId} deactivated`);
    }
  }

  addNewScheme(): void {
    alert('Add new insurance scheme functionality');
  }

  editScheme(scheme: any): void {
    alert(`Edit scheme: ${scheme.name}`);
  }

  toggleSchemeStatus(scheme: any): void {
    scheme.isActive = !scheme.isActive;
    alert(`Scheme ${scheme.name} ${scheme.isActive ? 'activated' : 'deactivated'}`);
  }
}