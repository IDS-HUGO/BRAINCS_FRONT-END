import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnoComponent } from './home-alumno/home-alumno.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CardGruposAlumnoComponent } from './home-alumno/card-grupos-alumno/card-grupos-alumno.component';


@NgModule({
  declarations: [
    HomeAlumnoComponent,
    CardGruposAlumnoComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HomeAlumnoComponent
  ]
})
export class AlumnoModule { }
