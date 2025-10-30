import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InsurancePolicy, InsurancePolicyRequest } from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'http://localhost:8080/api/policies';
  private mockMode = false;
  private mockPolicies: InsurancePolicy[] = [];

  constructor(private http: HttpClient) {}

  createPolicy(request: InsurancePolicyRequest): Observable<InsurancePolicy> {
    if (this.mockMode) {
      const mockPolicy: InsurancePolicy = {
        id: Date.now(),
        policyNumber: `POL-${Date.now()}`,
        policyType: request.insuranceType,
        premium: request.premiumAmount,
        coverageAmount: request.coverageAmount,
        startDate: request.policyStartDate,
        endDate: request.policyEndDate,
        status: 'ACTIVE',
        userId: 1
      };
      this.mockPolicies.push(mockPolicy);
      return of(mockPolicy);
    }
    return this.http.post<InsurancePolicy>(this.apiUrl, request);
  }

  getUserPolicies(): Observable<InsurancePolicy[]> {
    if (this.mockMode) {
      return of(this.mockPolicies);
    }
    return this.http.get<InsurancePolicy[]>(`${this.apiUrl}/my-policies`);
  }

  getAllPolicies(): Observable<InsurancePolicy[]> {
    if (this.mockMode) {
      return of(this.mockPolicies);
    }
    return this.http.get<InsurancePolicy[]>(this.apiUrl);
  }

  getPolicyById(id: number): Observable<InsurancePolicy> {
    if (this.mockMode) {
      const policy = this.mockPolicies.find(p => p.id === id);
      return of(policy!);
    }
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/${id}`);
  }

  downloadPolicy(id: number): Observable<Blob> {
    if (this.mockMode) {
      const mockBlob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      return of(mockBlob);
    }
    return this.http.get(`${this.apiUrl}/${id}/document`, { responseType: 'blob' });
  }
}