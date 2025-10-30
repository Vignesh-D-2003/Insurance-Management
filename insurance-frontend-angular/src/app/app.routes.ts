import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { PolicyListComponent } from './components/policies/policy-list';
import { PolicyFormComponent } from './components/policies/policy-form';
import { ClaimListComponent } from './components/claims/claim-list';
import { ClaimFormComponent } from './components/claims/claim-form';
import { AdminPanelComponent } from './components/admin/admin-panel';
import { ProfileComponent } from './components/profile/profile';
import { PaymentComponent } from './components/payment/payment';
import { ConnectivityTestComponent } from './components/connectivity-test/connectivity-test';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'policies', component: PolicyListComponent, canActivate: [AuthGuard] },
  { path: 'policies/create', component: PolicyFormComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'test-connectivity', component: ConnectivityTestComponent },
  { path: 'claims', component: ClaimListComponent, canActivate: [AuthGuard] },
  { path: 'claims/create', component: ClaimFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '/home' }
];
