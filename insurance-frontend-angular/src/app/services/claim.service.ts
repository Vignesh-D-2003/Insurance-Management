import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Claim, ClaimRequest, ClaimUpdateRequest } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://localhost:8080/api/claims';
  private mockMode = false;
  private mockClaims: Claim[] = [
    {
      id: 1,
      claimNumber: 'CLM-001',
      policyId: 1,
      claimAmount: 25000,
      claimDate: '2024-01-15',
      status: 'PENDING',
      description: 'Vehicle accident claim',
      userId: 2,
      insurancePolicy: {
        id: 1,
        policyNumber: 'POL-001',
        policyType: 'CAR_INSURANCE',
        premium: 15000,
        coverageAmount: 500000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'ACTIVE',
        userId: 2
      }
    },
    {
      id: 2,
      claimNumber: 'CLM-002',
      policyId: 2,
      claimAmount: 50000,
      claimDate: '2024-02-10',
      status: 'APPROVED',
      description: 'Health insurance claim',
      userId: 2,
      insurancePolicy: {
        id: 2,
        policyNumber: 'POL-002',
        policyType: 'HEALTH_INSURANCE',
        premium: 20000,
        coverageAmount: 1000000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'ACTIVE',
        userId: 2
      }
    }
  ];

  constructor(private http: HttpClient) {}

  createClaim(request: ClaimRequest): Observable<Claim> {
    if (this.mockMode) {
      const newClaim: Claim = {
        id: Date.now(),
        claimNumber: `CLM-${Date.now()}`,
        policyId: request.policyId,
        claimAmount: request.claimAmount,
        claimDate: new Date().toISOString().split('T')[0],
        status: 'PENDING',
        description: request.description,
        userId: 2,
        insurancePolicy: {
          id: request.policyId,
          policyNumber: 'POL-' + request.policyId,
          policyType: 'GENERAL',
          premium: 10000,
          coverageAmount: 500000,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          status: 'ACTIVE',
          userId: 2
        }
      };
      this.mockClaims.push(newClaim);
      return of(newClaim);
    }
    return this.http.post<Claim>(this.apiUrl, request);
  }

  getUserClaims(): Observable<Claim[]> {
    if (this.mockMode) {
      return of(this.mockClaims.filter(claim => claim.userId === 2));
    }
    return this.http.get<Claim[]>(`${this.apiUrl}/my-claims`);
  }

  getAllClaims(): Observable<Claim[]> {
    if (this.mockMode) {
      return of(this.mockClaims);
    }
    return this.http.get<Claim[]>(this.apiUrl);
  }

  updateClaim(id: number, request: ClaimUpdateRequest): Observable<Claim> {
    if (this.mockMode) {
      const claim = this.mockClaims.find(c => c.id === id);
      if (claim) {
        claim.status = request.status;
        return of(claim);
      }
    }
    return this.http.put<Claim>(`${this.apiUrl}/${id}`, request);
  }

  downloadClaim(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
  }

  uploadClaimDocuments(claimId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return this.http.post(`${this.apiUrl}/${claimId}/documents`, formData);
  }
}