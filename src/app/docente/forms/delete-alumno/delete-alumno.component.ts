import { Component } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { AlumnoSelectedService } from '../../../shared/cards/services/alumno-selected.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-delete-alumno',
  templateUrl: './delete-alumno.component.html',
  styleUrls: ['./delete-alumno.component.css']
})
export class DeleteAlumnoComponent {

  constructor(
    private alumnosService: AlumnosService,
    private alumnoSelectedService: AlumnoSelectedService,
    public loaderService: LoaderService,
    private alertService: AlertService,
    private modalService : ModalService
  ) {}

  confirmDelete() {
    this.alumnoSelectedService.selectedAlumno$.subscribe(selectedAlumno => {
      if (selectedAlumno && selectedAlumno.matricula) {
        const matricula = selectedAlumno.matricula;

        this.loaderService.show();
        this.alumnosService.deleteAlumnoByMatricula(matricula).subscribe({
          next: () => {
            this.loaderService.hide();
            console.log(`Alumno con matrícula ${matricula} eliminado exitosamente`);
            this.alertService.showSuccess('Alumno eliminado con éxito');
            this.modalService.closeModal()
          },
          error: (error: any) => {
            this.loaderService.hide();
            console.error('Error al eliminar el alumno:', error);
            this.alertService.showError(error.status, 'Error al eliminar el alumno');
            this.modalService.closeModal()
          }
        });
      } else {
        console.warn('No se encontró el alumno seleccionado.');
      }
    });
  }

  closeModal() {
    this.modalService.closeModal()
  }
}