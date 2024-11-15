import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnoComponent } from './home-alumno/home-alumno.component';
import { RouterModule } from '@angular/router';
import { CardGruposAlumnoComponent } from './home-alumno/card-grupos-alumno/card-grupos-alumno.component';
import { ActividadesAlumnoComponent } from './actividades-alumno/actividades-alumno.component';
import { RoutingAlumnoModule } from './routing-alumno/routing-alumno.module';
import { NavActComponent } from './actividades-alumno/nav-act/nav-act.component';
import { CardActComponent } from './actividades-alumno/card-act/card-act.component';
import { TemarioAlumnoComponent } from './temario-alumno/temario-alumno.component';
import { EstudiantesAlumnosComponent } from './estudiantes-alumnos/estudiantes-alumnos.component';
import { ChatbotAlumnoComponent } from './chatbot-alumno/chatbot-alumno.component';
import { ActividadModalComponent } from './actividades-alumno/actividad-modal/actividad-modal.component';
import { CardTemComponent } from './temario-alumno/card-tem/card-tem.component';
import { CardAlumComponent } from './estudiantes-alumnos/card-alum/card-alum.component';


@NgModule({
  declarations: [
    HomeAlumnoComponent,
    CardGruposAlumnoComponent,
    ActividadesAlumnoComponent,
    NavActComponent,
    CardAlumComponent,
    CardActComponent,
    CardTemComponent,
    TemarioAlumnoComponent,
    EstudiantesAlumnosComponent,
    ChatbotAlumnoComponent,
    ActividadModalComponent
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
