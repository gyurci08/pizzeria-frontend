import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {LoginGuardService} from '../service/login-guard-service';
import {RegisterComponent} from '../pages/register/register.component';
import {LogoutComponent} from '../pages/logout/logout.component';
import {AuthGuardService} from '../service/auth-guard-service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
