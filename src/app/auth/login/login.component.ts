import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  errors: { email: boolean; password: boolean } = { email: false, password: false };
  loginFailed: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.errors.email = !this.email || !this.emailRegex.test(this.email);
    this.errors.password = !this.password;

    if (!this.errors.email && !this.errors.password) {
      const role = this.loginService.login(this.email, this.password);
      if (role) {

        localStorage.setItem('role', role);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      } else {
        console.error('Credenciales incorrectas');
        this.loginFailed = true;
      }
    }
  }
}