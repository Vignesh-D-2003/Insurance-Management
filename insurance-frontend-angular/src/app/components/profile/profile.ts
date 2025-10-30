import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h4><i class="fas fa-user"></i> User Profile</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" [(ngModel)]="user.username" readonly>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" [(ngModel)]="user.email" [readonly]="!editMode">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-control" [(ngModel)]="user.fullName" [readonly]="!editMode">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Father Name</label>
                    <input type="text" class="form-control" [(ngModel)]="user.fatherName" [readonly]="!editMode">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="text" class="form-control" [(ngModel)]="user.phoneNumber" [readonly]="!editMode">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" [(ngModel)]="user.address" [readonly]="!editMode" rows="3"></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Created At</label>
                    <input type="text" class="form-control" [value]="user.createdAt | date:'medium'" readonly>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-control" [value]="user.role" readonly>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <button class="btn btn-secondary" (click)="goBack()">
                  <i class="fas fa-arrow-left"></i> Back
                </button>
                <div>
                  <button *ngIf="!editMode" class="btn btn-primary me-2" (click)="toggleEdit()">
                    <i class="fas fa-edit"></i> Edit Profile
                  </button>
                  <button *ngIf="editMode" class="btn btn-success me-2" (click)="saveProfile()">
                    <i class="fas fa-save"></i> Save Changes
                  </button>
                  <button *ngIf="editMode" class="btn btn-secondary" (click)="cancelEdit()">
                    <i class="fas fa-times"></i> Cancel
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
    .card {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .form-control[readonly] {
      background-color: #f8f9fa;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editMode = false;
  originalUser: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (userData) => {
        this.user = { ...userData };
        this.originalUser = { ...userData };
        localStorage.setItem('user', JSON.stringify(userData));
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.user = { ...currentUser };
          this.originalUser = { ...currentUser };
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  toggleEdit(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    this.authService.updateUserProfile(this.user).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = { ...updatedUser };
        this.originalUser = { ...updatedUser };
        this.editMode = false;
        alert('✅ Profile Updated Successfully!\n\nYour details have been saved to the database.');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert('❌ Failed to update profile\n\nError: ' + (error.error?.message || error.message));
      }
    });
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.editMode = false;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}