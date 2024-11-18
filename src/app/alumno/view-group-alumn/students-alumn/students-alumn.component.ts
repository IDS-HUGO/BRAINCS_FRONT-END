import { Component } from '@angular/core';

@Component({
  selector: 'app-students-alumn',
  templateUrl: './students-alumn.component.html',
  styleUrl: './students-alumn.component.css'
})
export class StudentsAlumnComponent {
     
  alumnos = [
    { nombre: 'Alesandra Guadalupe Ulloa Lopez' },
    { nombre: 'Jesus Eduardo Gutierrez Mandujano' },
    { nombre: 'Hugo Francisco Luis Inclan' }
];

}
