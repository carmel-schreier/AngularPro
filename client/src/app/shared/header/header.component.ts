import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailOptions } from 'joi';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLogout = false;
  user!: User;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmail();
  }
  getEmail() {
    this.apiService.getEmail().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete() {},
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login-component']);
  }
  toggleShow() {
    this.showLogout = !this.showLogout;
  }
}
