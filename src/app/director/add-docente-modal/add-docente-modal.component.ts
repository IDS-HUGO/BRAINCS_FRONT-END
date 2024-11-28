import { Component, EventEmitter, Output } from '@angular/core';
import { DocenteService } from '../Service/docente.service';
import { Docente } from '../Models/docente.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-docente-modal',
  templateUrl: './add-docente-modal.component.html',
  styleUrls: ['./add-docente-modal.component.css']
})
export class AddDocenteModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  docente: Docente = {
    id_docente:0,
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    usuario: '',
    contrasena: ''
  };

  isLoading: boolean = false;

  constructor(private docenteService: DocenteService, private router: Router) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  onSubmit() {
    if (!this.docente.nombre || !this.docente.apellido_p || !this.docente.apellido_m ||
        !this.docente.correo_electronico || !this.docente.usuario || !this.docente.contrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan datos',
        text: 'Por favor, llena todos los campos antes de continuar.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    this.isLoading = true;

    this.docenteService.addDocente(this.docente).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Docente agregado exitosamente!',
          text: `El docente ${this.docente.nombre} fue registrado correctamente.`,
          confirmButtonColor: '#004c4c'
        }).then(() => {
          this.closeModal();
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar docente',
          text: 'Ocurrió un problema al intentar agregar el docente. Inténtalo de nuevo.',
          confirmButtonColor: '#d33'
        });
        console.error('Error al añadir docente', error);
      }
    );
  }
}
