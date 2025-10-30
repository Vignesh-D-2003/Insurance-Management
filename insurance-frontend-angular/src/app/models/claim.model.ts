import { InsurancePolicy } from './insurance.model';

export interface Claim {
  id: number;
  claimNumber: string;
  policyId: number;
  userId: number;
  claimDate: string;
  description: string;
  claimAmount: number;
  status: string;
  reviewedBy?: number;
  reviewDate?: string;
  reviewComments?: string;
  insurancePolicy?: InsurancePolicy;
}

export interface ClaimRequest {
  policyId: number;
  description: string;
  claimAmount: number;
}

export interface ClaimUpdateRequest {
  status: string;
  reviewComments?: string;
}

export type { InsurancePolicy };