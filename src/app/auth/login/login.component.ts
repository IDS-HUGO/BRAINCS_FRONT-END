import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoginData } from '../models/login-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginData = {
    usuario: '',
    contrasena: '',
    usuarioRegex: /^[a-zA-Z0-9._-]{3,}$/,
    errors: { usuario: false, contrasena: false },
    loginFailed: false,
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginData.errors.usuario = !this.loginData.usuario || !this.loginData.usuarioRegex.test(this.loginData.usuario);
    this.loginData.errors.contrasena = !this.loginData.contrasena;

    if (!this.loginData.errors.usuario && !this.loginData.errors.contrasena) {
      this.loginService.login(this.loginData.usuario, this.loginData.contrasena).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido a la aplicación.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },        
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Por favor, verifica tu usuario y contraseña.',
            confirmButtonText: 'Intentar de nuevo'
          });
          this.loginData.loginFailed = true;
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'OK'
      });
    }
  }

  onGoBack() {
    this.router.navigate(['']);
  }

}