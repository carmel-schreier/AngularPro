//import { CustomersComponent } from './customers/customers/customers.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './core/auth.service';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthService],
    children: [{ path: 'users-component', component: UsersComponent }],
  },
  { path: 'signup-component', component: SignupComponent },
  { path: 'login-component', component: LoginComponent },

  // { path: 'customers-component', component: CustomersComponent },
  //{ path: 'signup-component', component: SignupComponent },
  //{ path: 'login-component', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
