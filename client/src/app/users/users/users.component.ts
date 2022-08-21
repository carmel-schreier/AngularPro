import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { number } from 'joi';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/shared/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private readonly tokenField = 'token';
  user!: User;
  email!: string;
  userDefined = false;
  showLogout = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.apiService.getUser().subscribe({
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
