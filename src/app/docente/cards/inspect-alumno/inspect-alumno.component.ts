import { Component } from '@angular/core';
import { AlumnoSelectedService } from '../../../shared/cards/services/alumno-selected.service';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-inspect-alumno',
  templateUrl: './inspect-alumno.component.html',
  styleUrls: ['./inspect-alumno.component.css']
})
export class InspectAlumnoComponent {
  alumno: any = null;

  constructor(
    private alumnoSelectedService: AlumnoSelectedService,
    private modalService: ModalService
  ) {
    this.alumnoSelectedService.selectedAlumno$.subscribe(
      (alumno) => {
        this.alumno = alumno;
      }
    );
  }

  closeModal() {
    this.modalService.closeModal();
    this.alumnoSelectedService.clearSelectedAlumno();
  }
}

