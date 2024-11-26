import { Component, EventEmitter, Output } from '@angular/core';
import { DocenteService } from '../Service/docente.service';
import { Docente } from '../Models/docente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-docente-modal',
  templateUrl: './add-docente-modal.component.html',
  styleUrls: ['./add-docente-modal.component.css']
})
export class AddDocenteModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  docente: Docente = {
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    usuario: '',
    contrasena: ''
  };

  constructor(private docenteService: DocenteService, private router: Router) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  onSubmit() {
    this.docenteService.addDocente(this.docente).subscribe(
      (response) => {
        console.log('Docente añadido exitosamente', response);
        this.router.navigate(['/docentes']); 
        this.closeModal();
      },
      (error) => {
        console.error('Error al añadir docente', error);
      }
    );
  }
}
