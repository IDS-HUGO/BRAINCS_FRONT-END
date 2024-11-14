import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ViewGroupComponent } from './docente/view-group/view-group.component';
import { ActividadesAlumnoComponent } from './alumno/actividades-alumno/actividades-alumno.component';
import { TemarioAlumnoComponent } from './alumno/temario-alumno/temario-alumno.component';
import { EstudiantesAlumnosComponent } from './alumno/estudiantes-alumnos/estudiantes-alumnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'docente/view-group', component: ViewGroupComponent },
  { path: 'alumno/view-act', component: ActividadesAlumnoComponent },
  { path: 'alumno/view-tem', component: TemarioAlumnoComponent },
  { path: 'alumno/view-student', component: EstudiantesAlumnosComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
