import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnoComponent } from './home-alumno/home-alumno.component';
import { HeaderComponent } from '../layout/header/header.component';
import { RouterModule } from '@angular/router';
import { CardGruposAlumnoComponent } from './home-alumno/card-grupos-alumno/card-grupos-alumno.component';
import { ActividadesAlumnoComponent } from './actividades-alumno/actividades-alumno.component';


@NgModule({
  declarations: [
    HomeAlumnoComponent,
    CardGruposAlumnoComponent,
    ActividadesAlumnoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    HomeAlumnoComponent
  ]
})
export class AlumnoModule { }
