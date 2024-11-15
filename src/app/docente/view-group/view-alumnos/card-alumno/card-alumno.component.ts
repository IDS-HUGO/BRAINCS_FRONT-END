import { Component } from '@angular/core';

@Component({
  selector: 'app-card-alumno',
  templateUrl: './card-alumno.component.html',
  styleUrl: './card-alumno.component.css'
})
export class CardAlumnoComponent {

  alumnos = [
    { nombre: 'Alesandra Guadalupe Ulloa Lopez' },
    { nombre: 'Jesus Eduardo Gutierrez Mandujano' },
    { nombre: 'Hugo Francisco Luis Inclan' }
];

}
