import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="bi bi-clipboard-check"></i> My Claims</h2>
        <button class="btn btn-primary" (click)="createClaim()">
          <i class="bi bi-plus-circle"></i> Create New Claim
        </button>
      </div>

      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Claim Number</th>
              <th>Policy Number</th>
              <th>Claim Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let claim of claims">
              <td>{{ claim.claimNumber }}</td>
              <td>{{ claim.insurancePolicy?.policyNumber || 'N/A' }}</td>
              <td>{{ formatDate(claim.claimDate) }}</td>
              <td>\${{ claim.claimAmount }}</td>
              <td>
                <span class="badge" [class]="getStatusClass(claim.status)">
                  {{ claim.status }}
                </span>
              </td>
              <td>{{ claim.description.substring(0, 50) }}...</td>
              <td>
                <button class="btn btn-sm btn-info" (click)="viewDetails(claim.id)">View</button>
                <button class="btn btn-sm btn-success" (click)="downloadClaim(claim.id)">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="alert alert-info" *ngIf="claims.length === 0">
        No claims found. Create your first claim to get started.
      </div>
    </div>
  `,
  styles: [`
    .badge-PENDING { background-color: #ffc107; }
    .badge-APPROVED { background-color: #28a745; }
    .badge-REJECTED { background-color: #dc3545; }
    .badge-UNDER_REVIEW { background-color: #17a2b8; }
  `]
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private claimService: ClaimService, private router: Router) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getUserClaims().subscribe({
      next: (data) => {
        this.claims = data;
      },
      error: (error) => {
        console.error('Error loading claims:', error);
      }
    });
  }

  createClaim(): void {
    this.router.navigate(['/claims/create']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/claims', id]);
  }

  downloadClaim(id: number): void {
    this.claimService.downloadClaim(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `claim-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading claim:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-PENDING';
      case 'APPROVED': return 'badge-APPROVED';
      case 'REJECTED': return 'badge-REJECTED';
      case 'UNDER_REVIEW': return 'badge-UNDER_REVIEW';
      default: return 'badge-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}