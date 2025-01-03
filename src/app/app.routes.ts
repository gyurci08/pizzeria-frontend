import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuardService} from './authentication/service/auth-guard-service';
import {NotFoundComponent} from './core/components/not-found/not-found.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {
    path: 'auth',
    loadChildren: () => import('./authentication/routing/authentication-routing.module').then(m => m.AuthenticationRoutingModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/routing/order-routing.module').then(m => m.OrderRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./customer/routing/customer-routing.module').then(m => m.CustomerRoutingModule),
    canActivate: [AuthGuardService]
  },

  // Wildcard path for error-handle
  {path: '**', component: NotFoundComponent}
];
