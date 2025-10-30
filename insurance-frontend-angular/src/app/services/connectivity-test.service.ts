import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityTestService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  testBackendConnection(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/statistics/dashboard`);
  }

  testH2Console(): Observable<any> {
    return this.http.get(`${this.baseUrl}/h2-console`, { responseType: 'text' });
  }

  testAuthEndpoint(): Observable<any> {
    const testLogin = {
      username: 'admin',
      password: 'admin123'
    };
    return this.http.post(`${this.baseUrl}/api/auth/login`, testLogin);
  }
}