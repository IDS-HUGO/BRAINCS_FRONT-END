import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.css']
})
export class AddAlumnoComponent implements OnInit {

  step = 1;
  matricula: string = '';
  nombres: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  correoElectronico: string = '';
  contrasena: string = '';
  calificacion: number = 0;
  grado: number = 0;
  grupo: string = '';

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private modalService: ModalService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.grado = Number(this.route.snapshot.paramMap.get('grado'));
    this.grupo = this.route.snapshot.paramMap.get('grupo') || '';
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  addAlumno(): void {
    const nuevoAlumno: Alumno = {
      matricula: this.matricula,
      nombre: this.nombres,
      apellido_p: this.apellidoPaterno,
      apellido_m: this.apellidoMaterno,
      correo_electronico: this.correoElectronico,
      contrasena: this.contrasena,
      grado: this.grado,
      grupo: this.grupo,
      calif_total: this.calificacion
    };

    this.loaderService.show();

    this.alumnosService.createAlumno(nuevoAlumno).subscribe({
      next: () => {
        this.alertService.showSuccess('Alumno agregado exitosamente');
        this.closeModal();
      },
      error: (err) => {
        const status = err.status || 500;
        this.alertService.showError(status, 'Error al agregar alumno');
      },
      complete: () => {
       this.loaderService.hide();
      }
    });
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
