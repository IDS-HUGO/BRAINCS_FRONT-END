import { Component, EventEmitter, Output } from '@angular/core';
import { DocenteService } from '../../Service/docente.service';
import { Docente } from '../../Models/docente.interface';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

@Component({
  selector: 'app-add-docente-modal',
  templateUrl: './add-docente-modal.component.html',
  styleUrls: ['./add-docente-modal.component.css'],
})
export class AddDocenteModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  docente: Docente = {
    id_docente: 0,
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    usuario: '',
    contrasena: '',
  };

  constructor(
    private docenteService: DocenteService,
    private modalService: ModalService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  closeModal() {
    this.modalService.closeModal();
  }

  onSubmit() {
    if (!this.docente.nombre || !this.docente.apellido_p || !this.docente.apellido_m ||
        !this.docente.correo_electronico || !this.docente.usuario || !this.docente.contrasena) {
      this.alertService.showWarning(
        'Por favor, completa todos los campos obligatorios.',
        'Campos incompletos'
      );
      return;
    }

    this.loaderService.show(); 
    this.docenteService.addDocente(this.docente).subscribe(
      (response) => {
        this.loaderService.hide(); this.alertService.showSuccess(
          `El docente ${this.docente.nombre} fue registrado correctamente.`,
          '¡Docente agregado exitosamente!'
        );
        this.closeModal();
      },
      (error) => {
        this.loaderService.hide();
        console.error('Error al añadir docente', error);
        this.alertService.showWarning(
          'Ocurrió un problema al intentar agregar el docente. Inténtalo de nuevo.',
          'Error al agregar docente'
        );
      }
    );
  }
}
