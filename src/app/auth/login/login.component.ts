import { Component } from '@angular/core';

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

  onSubmit() {
    this.errors.email = !this.email || !this.emailRegex.test(this.email);
    this.errors.password = !this.password;

    if (!this.errors.email && !this.errors.password) {
      console.log('Formulario válido. Procesando inicio de sesión...');
    }
  }
}