import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectivityTestService } from '../../services/connectivity-test.service';

@Component({
  selector: 'app-connectivity-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">API Connectivity Test</h4>
        </div>
        <div class="card-body">
          <div class="test-section mb-3">
            <h5>Backend Connection</h5>
            <button class="btn btn-outline-primary me-2" (click)="testBackend()">Test Backend</button>
            <span class="badge" [class]="backendStatus.class">{{backendStatus.message}}</span>
          </div>

          <div class="test-section mb-3">
            <h5>Authentication API</h5>
            <button class="btn btn-outline-success me-2" (click)="testAuth()">Test Auth</button>
            <span class="badge" [class]="authStatus.class">{{authStatus.message}}</span>
          </div>

          <div class="alert alert-info">
            <strong>H2 Database:</strong><br>
            URL: <a href="http://localhost:8080/h2-console" target="_blank">http://localhost:8080/h2-console</a><br>
            JDBC URL: jdbc:h2:mem:insurance_db<br>
            Username: sa | Password: password
          </div>

          <div *ngIf="testResults.length > 0">
            <h5>Results</h5>
            <div class="alert" [class]="result.class" *ngFor="let result of testResults">
              <strong>{{result.test}}:</strong> {{result.message}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-section { padding: 1rem; border: 1px solid #e9ecef; border-radius: 8px; background: #f8f9fa; }
    .badge-success { background-color: #28a745; }
    .badge-danger { background-color: #dc3545; }
    .badge-warning { background-color: #ffc107; color: #212529; }
    .badge-secondary { background-color: #6c757d; }
  `]
})
export class ConnectivityTestComponent {
  backendStatus = { message: 'Not Tested', class: 'badge-secondary' };
  authStatus = { message: 'Not Tested', class: 'badge-secondary' };
  testResults: any[] = [];

  constructor(private connectivityService: ConnectivityTestService) {}

  testBackend() {
    this.backendStatus = { message: 'Testing...', class: 'badge-warning' };
    
    this.connectivityService.testBackendConnection().subscribe({
      next: (response) => {
        this.backendStatus = { message: 'Connected ✓', class: 'badge-success' };
        this.addTestResult('Backend', 'SUCCESS: Backend accessible', 'alert-success');
      },
      error: (error) => {
        this.backendStatus = { message: 'Failed ✗', class: 'badge-danger' };
        this.addTestResult('Backend', `ERROR: ${error.message}`, 'alert-danger');
      }
    });
  }

  testAuth() {
    this.authStatus = { message: 'Testing...', class: 'badge-warning' };
    
    this.connectivityService.testAuthEndpoint().subscribe({
      next: (response) => {
        this.authStatus = { message: 'Working ✓', class: 'badge-success' };
        this.addTestResult('Auth', 'SUCCESS: Authentication working', 'alert-success');
      },
      error: (error) => {
        this.authStatus = { message: 'Failed ✗', class: 'badge-danger' };
        this.addTestResult('Auth', `ERROR: ${error.message}`, 'alert-danger');
      }
    });
  }

  private addTestResult(test: string, message: string, alertClass: string) {
    this.testResults.unshift({ test, message, class: alertClass });
  }
}