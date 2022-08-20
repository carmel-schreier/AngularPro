import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private router: Router, private authService: AuthService) {}

  redirectToFirstPage() {
    this.authService.isLoggedIn() == false
      ? this.router.navigate(['login-component'])
      : this.router.navigate(['users-component']);
  }
}
