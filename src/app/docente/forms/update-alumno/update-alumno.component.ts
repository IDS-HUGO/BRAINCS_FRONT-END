import { Component, OnInit } from '@angular/core';
import { AlumnoSelectedService } from '../../../shared/cards/services/alumno-selected.service';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

@Component({
  selector: 'app-update-alumno',
  templateUrl: './update-alumno.component.html',
  styleUrls: ['./update-alumno.component.css']
})
export class UpdateAlumnoComponent implements OnInit {
  step: number = 1;

  alumno: Alumno = {
    matricula: '',
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    correo_electronico: '',
    grado: 0,
    grupo: '',
    calif_total: 0,
    contrasena: ''
  };

  constructor(
    private alumnoSelectedService: AlumnoSelectedService,
    private alumnosService: AlumnosService,
    private modalService: ModalService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alumnoSelectedService.selectedAlumno$.subscribe(selectedAlumno => {
      if (selectedAlumno) {
        console.log('Alumno seleccionado:', selectedAlumno);
        this.alumno = { ...selectedAlumno };
      } else {
        console.warn('No se seleccionó ningún alumno.');
      }
    });
  }

  nextStep() {
    if (this.step < 2) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  updateAlumno() {
    this.loaderService.show();
    console.log('Datos enviados al backend:', this.alumno);

    this.alumnosService.updateAlumnoByMatricula(this.alumno.matricula, this.alumno).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
        this.alertService.showSuccess('El alumno se actualizó correctamente.');
        this.modalService.closeModal();
      },
      error => {
        console.error('Error al actualizar el alumno:', error);
        this.alertService.showError(error.status || 500, 'Error al actualizar');
      }
    ).add(() => {
      this.loaderService.hide(); 
    });
  }
}
