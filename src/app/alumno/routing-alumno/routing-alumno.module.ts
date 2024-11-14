import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesAlumnoComponent } from '../actividades-alumno/actividades-alumno.component';
import { TemarioAlumnoComponent } from '../temario-alumno/temario-alumno.component';
import { EstudiantesAlumnosComponent } from '../estudiantes-alumnos/estudiantes-alumnos.component';

const routes: Routes = [
  { path: 'view-act', component: ActividadesAlumnoComponent },
  { path: 'view-tem', component: TemarioAlumnoComponent},
  { path: 'view-student', component: EstudiantesAlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingAlumnoModule {}
