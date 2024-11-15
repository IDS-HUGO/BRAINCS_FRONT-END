import { Component } from '@angular/core';

@Component({
  selector: 'app-card-alum',
  templateUrl: './card-alum.component.html',
  styleUrl: './card-alum.component.css'
})
export class CardAlumComponent {
    
  alumnos = [
    { nombre: 'Alesandra Guadalupe Ulloa Lopez' },
    { nombre: 'Jesus Eduardo Gutierrez Mandujano' },
    { nombre: 'Hugo Francisco Luis Inclan' }
];


}
