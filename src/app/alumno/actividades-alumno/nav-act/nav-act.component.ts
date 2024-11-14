import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-act',
  templateUrl: './nav-act.component.html',
  styleUrl: './nav-act.component.css'
})
export class NavActComponent {

  constructor(private router: Router) {}

  navigateToActividades() {
    this.router.navigate(['alumno/view-act']);  
  }

  navigateToTemario() {
    this.router.navigate(['alumno/view-tem']);  
  }

  navigateToAlumnos() {
    this.router.navigate(['alumno/view-student']);  
  }

}
