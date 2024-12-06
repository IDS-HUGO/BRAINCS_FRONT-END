import { Component, EventEmitter, Output } from '@angular/core';
import { DocenteService } from '../../Service/docente.service';
import { Docente } from '../../Models/docente.interface';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-docente-modal',
  templateUrl: './add-docente-modal.component.html',
  styleUrls: ['./add-docente-modal.component.css'],
})
export class AddDocenteModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  step = 1;
  docente: Docente = {
    id_docente: 0,
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    usuario: '',
    contrasena: '',
  };

  selectedFile: File | null = null;

  constructor(
    private docenteService: DocenteService,
    private modalService: ModalService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  closeModal() {
    this.modalService.closeModal();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addDocente() {
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
        if (this.selectedFile) {
          this.docenteService.uploadUserImage(this.docente.usuario, this.selectedFile).subscribe(
            (imageResponse) => {
              this.loaderService.hide();
              this.alertService.showSuccess(
                `El docente ${this.docente.nombre} fue registrado correctamente.`,
                '¡Docente agregado exitosamente!'
              );
              this.closeModal();
            },
            (imageError) => {
              this.loaderService.hide();
              console.error('Error al subir la imagen', imageError);
              this.alertService.showWarning(
                'Docente agregado, pero ocurrió un error al subir la imagen.',
                'Error al subir imagen'
              );
            }
          );
        } else {
          this.loaderService.hide();
          this.alertService.showSuccess(
            `El docente ${this.docente.nombre} fue registrado correctamente.`,
            '¡Docente agregado exitosamente!'
          );
          this.closeModal();
        }
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

  nextStep(): void {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }
}
