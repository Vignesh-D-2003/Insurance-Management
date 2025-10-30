import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">Secure Your Future with <span class="text-primary">InsureMax</span></h1>
            <p class="hero-subtitle">Comprehensive insurance solutions for all your needs. Trusted by millions across India.</p>
            <div class="hero-buttons">
              <button class="btn btn-primary btn-lg me-3" routerLink="/login">Get Started</button>
              <button class="btn btn-outline-primary btn-lg me-3" (click)="scrollToInsurance()">View Plans</button>
              <button class="btn btn-outline-light btn-lg" routerLink="/test-connectivity">Test API</button>
            </div>
          </div>
          <div class="col-lg-6">
            <img src="https://via.placeholder.com/500x400/007bff/ffffff?text=Insurance+Protection" class="img-fluid hero-image" alt="Insurance">
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3">
            <div class="stat-card">
              <i class="fas fa-users stat-icon"></i>
              <h3>2.5M+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <i class="fas fa-file-contract stat-icon"></i>
              <h3>{{totalPolicies}}</h3>
              <p>Policies Issued</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <i class="fas fa-rupee-sign stat-icon"></i>
              <h3>₹{{totalAmountSettled}}</h3>
              <p>Claims Settled</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-card">
              <i class="fas fa-shield-alt stat-icon"></i>
              <h3>99.8%</h3>
              <p>Claim Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Insurance Types Section -->
    <section class="insurance-types" id="insurance-section">
      <div class="container">
        <div class="text-center mb-5">
          <h2>Our Insurance Products</h2>
          <p class="lead">Choose from our comprehensive range of insurance solutions</p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" *ngFor="let insurance of insuranceTypes">
            <div class="insurance-card">
              <div class="insurance-icon">
                <i [class]="insurance.icon"></i>
              </div>
              <h4>{{insurance.name}}</h4>
              <p>{{insurance.description}}</p>
              <ul class="features-list">
                <li *ngFor="let feature of insurance.features">{{feature}}</li>
              </ul>
              <button class="btn btn-outline-primary" routerLink="/login">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Companies Section -->
    <section class="partners-section">
      <div class="container">
        <div class="text-center mb-5">
          <h2>Our Trusted Partners</h2>
          <p class="lead">Leading insurance companies in India</p>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-2 col-md-4 col-6 mb-4" *ngFor="let company of insuranceCompanies">
            <div class="partner-logo">
              <img [src]="company.logo" [alt]="company.name" class="img-fluid">
              <p class="company-name">{{company.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h2>Ready to Get Protected?</h2>
            <p class="lead">Join millions of satisfied customers and secure your future today</p>
            <button class="btn btn-light btn-lg" routerLink="/login">Start Your Journey</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #768ed4ff 0%, #e8e2efff 100%, #f093fb 100%);
      color: white;
      padding: 100px 0;
      min-height: 80vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23ffffff" opacity="0.1"><polygon points="1000,100 1000,0 0,100"/></svg>');
      z-index: 1;
    }
    .hero-section .container {
      position: relative;
      z-index: 2;
    }
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    .hero-image {
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .stats-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .stat-card {
      padding: 2rem;
      background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    .stat-icon {
      font-size: 3rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }
    .stat-card h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .insurance-types {
      padding: 80px 0;
    }
    .insurance-card {
      background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      height: 100%;
      border: 1px solid rgba(255,255,255,0.2);
      position: relative;
      overflow: hidden;
    }
    .insurance-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .insurance-card:hover::before {
      left: 100%;
    }
    .insurance-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    .insurance-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }
    .insurance-card:hover .insurance-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
    }
    .insurance-icon i {
      font-size: 2rem;
      color: white;
    }
    .features-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
    }
    .features-list li {
      padding: 0.25rem 0;
      color: #666;
    }
    .partners-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    .partner-logo {
      text-align: center;
      padding: 1rem;
      background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .partner-logo:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    .partner-logo img {
      height: 60px;
      object-fit: contain;
    }
    .company-name {
      font-size: 0.9rem;
      margin-top: 0.5rem;
      color: #666;
    }
    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      color: white;
      padding: 80px 0;
      position: relative;
      overflow: hidden;
    }
    .cta-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-section {
        padding: 60px 0;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {
  totalPolicies = '1.2M+';
  totalAmountSettled = '5,000Cr+';

  insuranceTypes = [
    {
      name: 'Car Insurance',
      icon: 'fas fa-car',
      description: 'Comprehensive coverage for your vehicle',
      features: ['Third Party Coverage', 'Own Damage Protection', 'Personal Accident Cover']
    },
    {
      name: 'Bike Insurance',
      icon: 'fas fa-motorcycle',
      description: 'Complete protection for your two-wheeler',
      features: ['Theft Protection', 'Accident Coverage', 'Third Party Liability']
    },
    {
      name: 'Health Insurance',
      icon: 'fas fa-heartbeat',
      description: 'Medical coverage for you and your family',
      features: ['Cashless Treatment', 'Family Coverage', 'Pre-existing Conditions']
    },
    {
      name: 'Life Insurance',
      icon: 'fas fa-user-shield',
      description: 'Financial security for your loved ones',
      features: ['Term Coverage', 'Investment Options', 'Tax Benefits']
    }
  ];

  insuranceCompanies = [
    { name: 'LIC', logo: 'https://logos-world.net/wp-content/uploads/2023/05/LIC-Logo.png' },
    { name: 'HDFC ERGO', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOZYjL_GY9YOi74Tg5gSHhnIEUuVPHn39sQ&s' },
    { name: 'ICICI Lombard', logo: 'https://weareinovics.com/assets/images/clients-logo/icici-lombard-logo.png' },
    { name: 'Bajaj Allianz', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPogZOna-Z8Vz5Tp0tSLHGqzy0i8LdDWo3w&s' },
    { name: 'SBI General', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lzU3EGJaIpncZ-A7g7GaJ-HeL_D6S5mC4Q&s' },
    { name: 'Tata AIG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBXlXDyC5hcqQeuWpgnujbb_iWLC4AwD9_Q&s' }
  ];

  constructor(private router: Router) {}

  scrollToInsurance(): void {
    document.getElementById('insurance-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}