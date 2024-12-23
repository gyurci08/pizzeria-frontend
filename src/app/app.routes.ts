import { Routes } from '@angular/router';
import {LoginComponent} from './authentication/pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuardService} from './authentication/service/auth-guard-service';
import {LogoutComponent} from './authentication/pages/logout/logout.component';
import {NoAuthGuardService} from './authentication/service/no-auth-guard-service';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuardService]},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/routing/order-routing/order-routing.module').then(m => m.OrderRoutingModule)
  },
  // Should be the last
  { path: '**', redirectTo: '/dashboard' }
];
