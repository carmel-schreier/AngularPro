import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('passwordField') passwordField!: ElementRef;

  emailValid = true;
  passwordValid = true;

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.emailField.nativeElement.focus();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/users-component']);
      },

      error: (err) => console.error(err),
    });
  }
  checkValidEmail() {
    if (this.emailField.nativeElement.classList.contains('ng-invalid'))
      this.emailValid = false;
    else this.emailValid = true;
  }
  checkValidPassword() {
    if (this.passwordField.nativeElement.classList.contains('ng-invalid'))
      this.passwordValid = false;
    else this.passwordValid = true;
  }
}
