import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuardService} from './authentication/service/auth-guard-service';
import {LogoutComponent} from './authentication/pages/logout/logout.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
