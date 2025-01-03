import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {NoAuthGuardService} from '../service/no-auth-guard-service';
import {LogoutComponent} from '../pages/logout/logout.component';
import {AuthGuardService} from '../service/auth-guard-service';
import {RegisterComponent} from '../pages/register/register.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
