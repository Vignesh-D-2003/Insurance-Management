import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginRequest, SignUpRequest, JwtResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private mockMode = false; // Set to false when backend is available

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    if (this.mockMode) {
      if (request.username === 'admin' && request.password === 'admin123') {
        const adminResponse: JwtResponse = {
          token: 'admin-jwt-token',
          type: 'Bearer',
          id: 1,
          username: 'admin',
          email: 'admin@insuremax.com',
          role: 'ADMIN'
        };
        return of(adminResponse);
      }
      const userResponse: JwtResponse = {
        token: 'user-jwt-token',
        type: 'Bearer',
        id: 2,
        username: request.username,
        email: `${request.username}@example.com`,
        role: 'CUSTOMER'
      };
      return of(userResponse);
    }
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request);
  }

  signup(request: SignUpRequest): Observable<any> {
    if (this.mockMode) {
      return of('User registered successfully');
    }
    return this.http.post(`${this.apiUrl}/signup`, request, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'ADMIN';
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }
}