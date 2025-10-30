import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, paymentData);
  }

  mockSuccessPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mock-success`, paymentData);
  }

  mockFailurePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mock-failure`, paymentData);
  }
}