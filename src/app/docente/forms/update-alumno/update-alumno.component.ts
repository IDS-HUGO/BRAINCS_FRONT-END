import { Component, OnInit } from '@angular/core';
import { AlumnoSelectedService } from '../../../shared/cards/services/alumno-selected.service';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';
import { ModalService } from '../../../shared/modals/services/modal.service';

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
    private modalService : ModalService
  ) {}

  ngOnInit() {
    this.alumnoSelectedService.selectedAlumno$.subscribe(selectedAlumno => {
      if (selectedAlumno) {
        this.alumno = { ...selectedAlumno };
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
    this.modalService.closeModal()
  }

  updateAlumno() {
    this.alumnosService.updateAlumnoByMatricula(this.alumno.matricula, this.alumno).subscribe(
      response => {
        console.log('Alumno actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el alumno:', error);
      }
    );
  }
}