import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { InsurancePolicyRequest, VehicleInsurance, HealthInsurance, TermLifeInsurance } from '../../models/insurance.model';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-4">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          <div class="d-flex align-items-center mb-4">
            <i class="bi bi-shield-plus fs-1 text-primary me-3"></i>
            <div>
              <h2 class="mb-0">Create New Insurance Policy</h2>
              <p class="text-muted mb-0">Fill in the details to create your insurance policy</p>
            </div>
          </div>
          
          <form (ngSubmit)="onSubmit()">
        <!-- Basic Policy Information -->
        <div class="card">
          <div class="card-header">
            <i class="bi bi-info-circle me-2"></i>Policy Information
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Policy Type</label>
                <select class="form-select" [(ngModel)]="policy.insuranceType" name="insuranceType" (change)="onPolicyTypeChange()" required>
                  <option value="">Select Policy Type</option>
                  <option value="BIKE">Motorcycle Insurance</option>
                  <option value="CAR">Car Insurance</option>
                  <option value="HEALTH">Health Insurance</option>
                  <option value="TERM_LIFE">Term Life Insurance</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Premium Amount ($)</label>
                <input type="number" class="form-control" [(ngModel)]="policy.premiumAmount" name="premiumAmount" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Coverage Amount ($)</label>
                <input type="number" class="form-control" [(ngModel)]="policy.coverageAmount" name="coverageAmount" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Policy Duration (years)</label>
                <input type="number" class="form-control" [(ngModel)]="duration" name="duration" (change)="updateDates()" required>
              </div>
            </div>
          </div>
        </div>

        <!-- Vehicle Insurance Details -->
        <div class="card" *ngIf="isVehiclePolicy()">
          <div class="card-header">
            <i class="bi bi-car-front me-2"></i>Vehicle Information
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Make</label>
                <input type="text" class="form-control" [(ngModel)]="vehicle.make" name="make">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Model</label>
                <input type="text" class="form-control" [(ngModel)]="vehicle.model" name="model">
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mb-3">
                <label class="form-label">Year</label>
                <input type="number" class="form-control" [(ngModel)]="vehicle.year" name="year">
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label">VIN</label>
                <input type="text" class="form-control" [(ngModel)]="vehicle.vin" name="vin">
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label">Registration Number</label>
                <input type="text" class="form-control" [(ngModel)]="vehicle.registrationNumber" name="registrationNumber">
              </div>
            </div>
          </div>
        </div>

        <!-- Health Insurance Details -->
        <div class="card" *ngIf="policy.insuranceType === 'HEALTH'">
          <div class="card-header">
            <i class="bi bi-heart-pulse me-2"></i>Health Information
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Policy Holder Name</label>
                <input type="text" class="form-control" [(ngModel)]="health.policyHolderName" name="policyHolderName">
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Age</label>
                <input type="number" class="form-control" [(ngModel)]="health.age" name="age">
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Gender</label>
                <select class="form-select" [(ngModel)]="health.gender" name="gender">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Pre-existing Conditions</label>
              <textarea class="form-control" [(ngModel)]="health.preExistingConditions" name="preExistingConditions"></textarea>
            </div>
          </div>
        </div>

        <!-- Term Life Insurance Details -->
        <div class="card" *ngIf="policy.insuranceType === 'TERM_LIFE'">
          <div class="card-header">
            <i class="bi bi-person-heart me-2"></i>Life Insurance Information
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Policy Holder Name</label>
                <input type="text" class="form-control" [(ngModel)]="termLife.policyHolderName" name="policyHolderName">
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Age</label>
                <input type="number" class="form-control" [(ngModel)]="termLife.age" name="age">
              </div>
              <div class="col-md-3 mb-3">
                <label class="form-label">Gender</label>
                <select class="form-select" [(ngModel)]="termLife.gender" name="gender">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Term (years)</label>
                <input type="number" class="form-control" [(ngModel)]="termLife.term" name="term">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Coverage Type</label>
                <select class="form-select" [(ngModel)]="termLife.coverageType" name="coverageType">
                  <option value="LEVEL">Level</option>
                  <option value="DECREASING">Decreasing</option>
                  <option value="INCREASING">Increasing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

            <div class="d-flex gap-3 mt-4">
              <button type="submit" class="btn btn-primary btn-lg px-4">
                <i class="bi bi-check-circle"></i> Create Policy & Pay
              </button>
              <button type="button" class="btn btn-outline-secondary btn-lg px-4" (click)="cancel()">
                <i class="bi bi-x-circle"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      margin-bottom: 1.5rem;
    }
    .card-header {
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
      border-radius: 15px 15px 0 0 !important;
      font-weight: 600;
    }
    .form-control:focus, .form-select:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    .btn-lg {
      padding: 12px 24px;
      font-weight: 600;
    }
  `]
})
export class PolicyFormComponent {
  policy: InsurancePolicyRequest = {
    insuranceType: '',
    premiumAmount: 0,
    coverageAmount: 0,
    policyStartDate: '',
    policyEndDate: '',
    isNewPolicy: true
  };
  
  vehicle: VehicleInsurance = {
    id: 0,
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vehicleType: '',
    vin: '',
    registrationNumber: '',
    engineCapacity: 0
  };
  
  health: HealthInsurance = {
    id: 0,
    policyHolderName: '',
    age: 0,
    gender: 'MALE',
    preExistingConditions: '',
    coverageType: 'INDIVIDUAL'
  };
  
  termLife: TermLifeInsurance = {
    id: 0,
    policyHolderName: '',
    age: 0,
    gender: 'MALE',
    term: 10,
    coverageType: 'LEVEL'
  };
  
  duration = 1;

  constructor(private insuranceService: InsuranceService, private router: Router) {
    this.updateDates();
  }

  onPolicyTypeChange(): void {
    if (this.isVehiclePolicy()) {
      this.vehicle.vehicleType = this.policy.insuranceType;
    }
  }

  isVehiclePolicy(): boolean {
    return this.policy.insuranceType === 'BIKE' || this.policy.insuranceType === 'CAR';
  }

  updateDates(): void {
    const today = new Date();
    this.policy.policyStartDate = today.toISOString();
    
    const endDate = new Date(today);
    endDate.setFullYear(endDate.getFullYear() + this.duration);
    this.policy.policyEndDate = endDate.toISOString();
  }

  onSubmit(): void {
    const request = { ...this.policy };
    
    if (this.isVehiclePolicy()) {
      request.vehicleInsurance = this.vehicle;
    } else if (this.policy.insuranceType === 'HEALTH') {
      request.healthInsurance = this.health;
    } else if (this.policy.insuranceType === 'TERM_LIFE') {
      request.termLifeInsurance = this.termLife;
    }

    console.log('Creating policy with request:', request);
    this.insuranceService.createPolicy(request).subscribe({
      next: (policy) => {
        alert('✅ Policy Created Successfully!\n\n' +
              '📋 Policy Number: ' + policy.policyNumber + '\n' +
              '💰 Premium: $' + this.policy.premiumAmount + '\n' +
              '🛡️ Coverage: $' + this.policy.coverageAmount + '\n\n' +
              'Redirecting to payment...');
        this.router.navigate(['/payment'], {
          queryParams: {
            policyId: policy.id,
            amount: this.policy.premiumAmount
          }
        });
      },
      error: (error) => {
        console.error('Error creating policy:', error);
        const errorMsg = error.error?.message || error.error || error.message || 'Unknown error';
        alert('❌ Failed to create policy\n\n' +
              'Error: ' + errorMsg + '\n\n' +
              'Please check all required fields and try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/policies']);
  }
}