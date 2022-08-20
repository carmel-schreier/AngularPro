import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivateChild {
  private readonly tokenField = 'token';
  redirectUrl: string | null = null;
  user_id!: number;

  constructor(private router: Router, private apiService: ApiService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (this.isLoggedIn()) {
      return true;
    }
    this.redirectUrl = state.url;

    return this.router.navigate(['login-component']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenField);
    //console.log(token);
    if (token && token.length > 0) {
      this.apiService.setToken(token);
      return true;
    }

    return false;
  }

  login(details: Login): Observable<User> {
    return this.apiService.login(details).pipe(
      tap((data: User) => {
        if (data.token) {
          localStorage.setItem(this.tokenField, data.token);
          this.apiService.setToken(data.token);
          //this.user=data;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenField);
    this.apiService.setToken('');
  }
}
