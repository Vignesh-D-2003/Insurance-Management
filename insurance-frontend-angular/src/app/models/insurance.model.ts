export interface InsurancePolicy {
  id: number;
  policyNumber: string;
  policyType: string;
  premium: number;
  coverageAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  userId: number;
  vehicleInsurance?: VehicleInsurance;
  healthInsurance?: HealthInsurance;
  termLifeInsurance?: TermLifeInsurance;
}

export interface VehicleInsurance {
  id: number;
  make: string;
  model: string;
  year: number;
  vehicleType: string;
  vin: string;
  registrationNumber: string;
  engineCapacity: number;
}

export interface HealthInsurance {
  id: number;
  policyHolderName: string;
  age: number;
  gender: string;
  preExistingConditions: string;
  coverageType: string;
  familyMembers?: FamilyMember[];
}

export interface TermLifeInsurance {
  id: number;
  policyHolderName: string;
  age: number;
  gender: string;
  term: number;
  coverageType: string;
  beneficiaries?: Beneficiary[];
}

export interface FamilyMember {
  id: number;
  name: string;
  age: number;
  gender: string;
  relationship: string;
}

export interface Beneficiary {
  id: number;
  name: string;
  age: number;
  gender: string;
  relationship: string;
  percentage: number;
}

export interface InsurancePolicyRequest {
  insuranceType: string;
  premiumAmount: number;
  coverageAmount: number;
  policyStartDate: string;
  policyEndDate: string;
  isNewPolicy?: boolean;
  vehicleInsurance?: VehicleInsurance;
  healthInsurance?: HealthInsurance;
  termLifeInsurance?: TermLifeInsurance;
}