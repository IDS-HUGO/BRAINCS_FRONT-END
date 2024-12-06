import { Component } from '@angular/core';
import { GruposService } from '../services/grupos.service';
import { Alumno } from '../models/alumno';
import { Grupo } from '../models/grupo';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.component.html',
  styleUrls: ['./home-alumno.component.css']
})
export class HomeAlumnoComponent {
  modalOpen: boolean = false;
  groups: Grupo[] = [];
  grado: number = Number(localStorage.getItem('grado'));
  grupo: string = String(localStorage.getItem('grupo'));

  constructor(private grupoService: GruposService) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.grupoService.getGroupsByGradoGrupo(this.grado, this.grupo).subscribe({
      next: (response) => {
        this.groups = response;
        console.log('Grupos cargados:', this.groups);
      },
      error: (error) => {
        console.error('Error al obtener los grupos:', error);
      }
    });
  }
}
