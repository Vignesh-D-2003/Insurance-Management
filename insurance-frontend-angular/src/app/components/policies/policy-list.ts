import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { InsurancePolicy } from '../../models/insurance.model';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="bi bi-shield-check"></i> My Insurance Policies</h2>
        <button class="btn btn-primary" (click)="createPolicy()">
          <i class="bi bi-plus-circle"></i> Create New Policy
        </button>
      </div>

      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Policy Number</th>
              <th>Type</th>
              <th>Premium</th>
              <th>Coverage</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let policy of policies">
              <td>{{ policy.policyNumber }}</td>
              <td>{{ policy.policyType }}</td>
              <td>\${{ policy.premium }}</td>
              <td>\${{ policy.coverageAmount }}</td>
              <td>
                <span class="badge" [class]="getStatusClass(policy.status)">
                  {{ policy.status }}
                </span>
              </td>
              <td>{{ formatDate(policy.startDate) }}</td>
              <td>{{ formatDate(policy.endDate) }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button class="btn btn-sm btn-info" (click)="viewDetails(policy.id)">
                    <i class="bi bi-eye"></i> View
                  </button>
                  <button class="btn btn-sm btn-success" (click)="downloadPolicy(policy.id)">
                    <i class="bi bi-download"></i> PDF
                  </button>
                  <button class="btn btn-sm btn-warning" (click)="makePayment(policy.id, policy.premium)" 
                          *ngIf="policy.status === 'PENDING'">
                    <i class="bi bi-credit-card"></i> Pay
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="alert alert-info" *ngIf="policies.length === 0">
        No policies found. Create your first policy to get started.
      </div>
    </div>
  `,
  styles: [`
    .badge-active { background-color: #28a745; }
    .badge-pending { background-color: #ffc107; }
    .badge-expired { background-color: #dc3545; }
    .badge-cancelled { background-color: #6c757d; }
  `]
})
export class PolicyListComponent implements OnInit {
  policies: InsurancePolicy[] = [];

  constructor(private insuranceService: InsuranceService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.insuranceService.getUserPolicies().subscribe({
      next: (data) => {
        this.policies = data;
      },
      error: (error) => {
        console.error('Error loading policies:', error);
      }
    });
  }

  createPolicy(): void {
    this.router.navigate(['/policies/create']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/policies', id]);
  }

  downloadPolicy(id: number): void {
    this.insuranceService.downloadPolicy(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `policy-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading policy:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'badge-active';
      case 'PENDING': return 'badge-pending';
      case 'EXPIRED': return 'badge-expired';
      case 'CANCELLED': return 'badge-cancelled';
      default: return 'badge-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  makePayment(policyId: number, amount: number): void {
    this.router.navigate(['/payment'], {
      queryParams: {
        policyId: policyId,
        amount: amount
      }
    });
  }
}