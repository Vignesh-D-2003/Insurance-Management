import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-4">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="payment-card">
            <div class="payment-header">
              <i class="bi bi-credit-card fs-1 text-white me-3"></i>
              <div>
                <h2 class="mb-0 text-white">Payment Gateway</h2>
                <p class="text-white-50 mb-0">Secure payment for your insurance policy</p>
              </div>
            </div>
            
            <div class="payment-body">
              <div class="payment-summary">
                <h5>Payment Summary</h5>
                <div class="d-flex justify-content-between">
                  <span>Policy Premium:</span>
                  <span class="fw-bold">₹{{paymentData.amount}}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Processing Fee:</span>
                  <span class="fw-bold">₹50</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between fs-5">
                  <span class="fw-bold">Total Amount:</span>
                  <span class="fw-bold text-primary">₹{{paymentData.amount + 50}}</span>
                </div>
              </div>

              <form (ngSubmit)="processPayment()" *ngIf="!paymentProcessing && !paymentComplete">
                <div class="mb-3">
                  <label class="form-label">Payment Method</label>
                  <select class="form-select" [(ngModel)]="paymentData.paymentMethod" name="paymentMethod" required>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Card Number</label>
                  <input type="text" class="form-control" [(ngModel)]="paymentData.cardNumber" 
                         name="cardNumber" placeholder="1234 5678 9012 3456" required>
                </div>

                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Card Holder Name</label>
                    <input type="text" class="form-control" [(ngModel)]="paymentData.cardHolderName" 
                           name="cardHolderName" placeholder="John Doe" required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">CVV</label>
                    <input type="password" class="form-control" [(ngModel)]="paymentData.cvv" 
                           name="cvv" placeholder="123" maxlength="3" required>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Expiry Date</label>
                  <input type="text" class="form-control" [(ngModel)]="paymentData.expiryDate" 
                         name="expiryDate" placeholder="MM/YY" required>
                </div>

                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary btn-lg">
                    Pay Securely ₹{{paymentData.amount + 50}}
                  </button>
                  <button type="button" class="btn btn-success btn-lg" (click)="mockSuccessPayment()">
                    Mock Success Payment
                  </button>
                </div>
              </form>

              <div *ngIf="paymentProcessing" class="text-center py-5">
                <div class="spinner-border text-primary mb-3"></div>
                <h5>Processing Payment...</h5>
              </div>

              <div *ngIf="paymentComplete" class="text-center py-5">
                <div *ngIf="paymentSuccess">
                  <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                  <h4 class="text-success mt-3">Payment Successful!</h4>
                  <button class="btn btn-primary" (click)="goToPolicies()">View My Policies</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .payment-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      display: flex;
      align-items: center;
    }
    .payment-body {
      padding: 2rem;
    }
    .payment-summary {
      background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 1.5rem;
      border-radius: 15px;
      margin-bottom: 2rem;
    }
  `]
})
export class PaymentComponent implements OnInit {
  paymentData = {
    policyId: 0,
    amount: 0,
    paymentMethod: 'CREDIT_CARD',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  };

  paymentProcessing = false;
  paymentComplete = false;
  paymentSuccess = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentData.policyId = +params['policyId'] || 0;
      this.paymentData.amount = +params['amount'] || 5000;
    });
  }

  processPayment() {
    this.paymentProcessing = true;
    setTimeout(() => {
      this.paymentProcessing = false;
      this.paymentComplete = true;
      this.paymentSuccess = true;
    }, 2000);
  }

  mockSuccessPayment() {
    this.paymentProcessing = true;
    setTimeout(() => {
      this.paymentProcessing = false;
      this.paymentComplete = true;
      this.paymentSuccess = true;
    }, 1000);
  }

  goToPolicies() {
    this.router.navigate(['/policies']);
  }
}