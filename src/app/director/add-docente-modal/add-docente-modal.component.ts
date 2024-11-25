// director/add-docente-modal/add-docente-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Docente } from '../Models/docente.interface';
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

  closeModal() {
    this.closeModalEvent.emit();
  }

  onSubmit() {
    console.log(this.docente);
  }
}
