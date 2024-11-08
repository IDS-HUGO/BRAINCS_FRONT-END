import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnoComponent } from './home-alumno/home-alumno.component';
import { RouterModule } from '@angular/router';
import { CardGruposAlumnoComponent } from './home-alumno/card-grupos-alumno/card-grupos-alumno.component';
import { ActividadesAlumnoComponent } from './actividades-alumno/actividades-alumno.component';
import { RoutingAlumnoModule } from './routing-alumno/routing-alumno.module';
import { NavActComponent } from './actividades-alumno/nav-act/nav-act.component';
import { CardActComponent } from './actividades-alumno/card-act/card-act.component';


@NgModule({
  declarations: [
    HomeAlumnoComponent,
    CardGruposAlumnoComponent,
    ActividadesAlumnoComponent,
    NavActComponent,
    CardActComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RoutingAlumnoModule
  ],
  exports : [
    HomeAlumnoComponent
  ]
})
export class AlumnoModule { }
