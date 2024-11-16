import { Component } from '@angular/core';

@Component({
  selector: 'app-view-alumnos',
  templateUrl: './view-alumnos.component.html',
  styleUrls: ['./view-alumnos.component.css']
})
export class ViewAlumnosComponent {
  alumnos = [
    { nombre: 'Juan Perez' },
    { nombre: 'Ana Martinez' },
  ];
}