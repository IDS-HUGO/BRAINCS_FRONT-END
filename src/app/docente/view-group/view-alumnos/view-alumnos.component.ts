import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-view-alumnos',
  templateUrl: './view-alumnos.component.html',
  styleUrls: ['./view-alumnos.component.css']
})
export class ViewAlumnosComponent implements OnInit {
  alumnos: any[] = [];
  grado: number = 0;
  grupo: string = '';

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private modalService : ModalService
  ) {}

  ngOnInit(): void {
    this.grado = Number(this.route.snapshot.paramMap.get('grado'));
    this.grupo = this.route.snapshot.paramMap.get('grupo') || '';
    console.log('Grado:', this.grado, 'Grupo:', this.grupo);

    if (this.grado && this.grupo) {
      this.loadAlumnos();
    }
  }

  loadAlumnos(): void {
    this.alumnosService.getAlumnos(this.grado, this.grupo).subscribe(
      (response) => {
        console.log('Respuesta de alumnos:', response);
        if (Array.isArray(response)) {
          this.alumnos = response;
        } else {
          console.error('La respuesta no es un arreglo');
        }
      },
      (error) => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  }

  onAddAlumno() {
    this.modalService.openModal('alumno');
  }
  

}