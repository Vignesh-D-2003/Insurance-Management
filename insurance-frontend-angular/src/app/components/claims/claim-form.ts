import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from '../../services/claim.service';
import { InsuranceService } from '../../services/insurance.service';
import { ClaimRequest, InsurancePolicy } from '../../models/claim.model';

@Component({
  selector: 'app-claim-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-4">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="d-flex align-items-center mb-4">
            <i class="bi bi-clipboard-plus fs-1 text-warning me-3"></i>
            <div>
              <h2 class="mb-0">Create New Claim</h2>
              <p class="text-muted mb-0">Submit a claim for your insurance policy</p>
            </div>
          </div>
          
          <form (ngSubmit)="onSubmit()">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-transparent">
                <h5 class="mb-0"><i class="bi bi-info-circle"></i> Claim Information</h5>
              </div>
              <div class="card-body p-4">
                <div class="mb-4">
                  <label class="form-label fw-semibold">Select Policy *</label>
                  <select class="form-select form-select-lg" [(ngModel)]="claim.policyId" name="policyId" required>
                    <option value="">Choose your active policy</option>
                    <option *ngFor="let policy of policies" [value]="policy.id">
                      {{ policy.policyNumber }} - {{ policy.policyType }}
                    </option>
                  </select>
                  <div class="form-text">Only active policies are available for claims</div>
                </div>
                
                <div class="mb-4">
                  <label class="form-label fw-semibold">Claim Amount ($) *</label>
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" [(ngModel)]="claim.claimAmount" name="claimAmount" placeholder="0.00" step="0.01" required>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label class="form-label fw-semibold">Description *</label>
                  <textarea class="form-control" [(ngModel)]="claim.description" name="description" rows="4" 
                    placeholder="Describe the incident, damage, or reason for the claim..." required></textarea>
                </div>
                
                <div class="mb-4">
                  <label class="form-label fw-semibold">Supporting Documents</label>
                  <div class="upload-area" (click)="fileInput.click()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
                    <input #fileInput type="file" class="d-none" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" (change)="onFileSelect($event)">
                    <div class="text-center py-4">
                      <i class="bi bi-cloud-upload fs-1 text-muted"></i>
                      <p class="mb-2">Click to upload or drag and drop</p>
                      <small class="text-muted">PDF, Images, Documents (Max 10MB each)</small>
                    </div>
                  </div>
                  <div class="mt-2" *ngIf="selectedFiles.length > 0">
                    <div class="d-flex flex-wrap gap-2">
                      <span class="badge bg-primary" *ngFor="let file of selectedFiles; let i = index">
                        {{ file.name }}
                        <button type="button" class="btn-close btn-close-white ms-1" (click)="removeFile(i)"></button>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex gap-3">
                  <button type="submit" class="btn btn-warning btn-lg px-4" [disabled]="!claim.policyId || !claim.description || !claim.claimAmount">
                    <i class="bi bi-send"></i> Submit Claim
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-lg px-4" (click)="cancel()">
                    <i class="bi bi-x-circle"></i> Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-area {
      border: 2px dashed #dee2e6;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .upload-area:hover {
      border-color: #007bff;
      background-color: #f8f9fa;
    }
    .upload-area.dragover {
      border-color: #007bff;
      background-color: #e3f2fd;
    }
    .form-select:focus, .form-control:focus {
      border-color: #ffc107;
      box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
    }
  `]
})
export class ClaimFormComponent implements OnInit {
  claim: ClaimRequest = {
    policyId: 0,
    description: '',
    claimAmount: 0
  };
  
  policies: InsurancePolicy[] = [];
  selectedFiles: File[] = [];

  constructor(
    private claimService: ClaimService,
    private insuranceService: InsuranceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.insuranceService.getUserPolicies().subscribe({
      next: (data) => {
        this.policies = data.filter(policy => policy.status === 'ACTIVE');
      },
      error: (error) => {
        console.error('Error loading policies:', error);
      }
    });
  }

  onSubmit(): void {
    this.claimService.createClaim(this.claim).subscribe({
      next: (claim) => {
        if (this.selectedFiles.length > 0) {
          this.uploadFiles(claim.id);
        } else {
          this.showSuccessAlert(claim);
        }
      },
      error: (error) => {
        console.error('Error creating claim:', error);
        alert('❌ Failed to submit claim. Please try again.\n\nError: ' + (error.error?.message || error.message));
      }
    });
  }

  uploadFiles(claimId: number): void {
    this.claimService.uploadClaimDocuments(claimId, this.selectedFiles).subscribe({
      next: () => {
        this.showSuccessAlert({ id: claimId, claimNumber: 'CLM-' + claimId });
      },
      error: (error) => {
        console.error('Error uploading files:', error);
        alert('⚠️ Claim submitted but file upload failed.\n\nPlease upload documents later from claim details.');
        this.router.navigate(['/claims']);
      }
    });
  }

  showSuccessAlert(claim: any): void {
    alert('✅ Claim Submitted Successfully!\n\n' +
          '📋 Claim Number: ' + claim.claimNumber + '\n' +
          '💰 Amount: $' + this.claim.claimAmount + '\n' +
          '📄 Status: PENDING\n\n' +
          'Your claim has been submitted and is under review.\n' +
          'You will be notified once it is processed.');
    this.router.navigate(['/claims']);
  }

  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.addFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');
    const files = Array.from(event.dataTransfer?.files || []) as File[];
    this.addFiles(files);
  }

  addFiles(files: File[]): void {
    files.forEach(file => {
      if (file.size <= 10 * 1024 * 1024) { // 10MB limit
        this.selectedFiles.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  cancel(): void {
    this.router.navigate(['/claims']);
  }
}