import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card-grupos-alumno',
  templateUrl: './card-grupos-alumno.component.html',
  styleUrl: './card-grupos-alumno.component.css'
})
export class CardGruposAlumnoComponent {
  @Input() subjectName: string = 'Matematicas I';

}
