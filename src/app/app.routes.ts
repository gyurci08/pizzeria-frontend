import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuardService} from './authentication/service/auth-guard-service';
import {NoAuthGuardService} from './authentication/service/no-auth-guard-service';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', component: HomeComponent, canActivate: [NoAuthGuardService]},
  {
    path: 'auth',
    loadChildren: () => import('./authentication/routing/authentication-routing.module').then(m => m.AuthenticationRoutingModule),
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/routing/order-routing.module').then(m => m.OrderRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-data',
    loadChildren: () => import('./customer/routing/customer-routing.module').then(m => m.CustomerRoutingModule),
    canActivate: [AuthGuardService]
  },
  // Should be the last
  {path: '**', redirectTo: '/home'}
];
