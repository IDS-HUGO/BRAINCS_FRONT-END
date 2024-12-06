import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-grupos-alumno',
  templateUrl: './card-grupos-alumno.component.html',
  styleUrls: ['./card-grupos-alumno.component.css']
})
export class CardGruposAlumnoComponent {
  @Input() subjectName: string = 'Matematicas I';

  constructor(private router: Router) {}
 
  navigateToDetail() {
    this.router.navigate(['alumno/view-act']); 
  }
}
