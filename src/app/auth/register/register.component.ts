import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { RegisterService } from '../services/register.service';
import { Director } from '../models/director.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,16}$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{2,50}$/)]],
      apellido_p: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{2,50}$/)]],
      apellido_m: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{2,50}$/)]],
      correo_electronico: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        ]
      ],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const director: Director = this.registerForm.value;

      this.registerService.registerDirector(director).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada correctamente.',
            confirmButtonText: 'Ir a Login'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al registrar. Intenta nuevamente.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, revisa que todos los campos estén completos y correctos.'
      });
    }
  }
}
