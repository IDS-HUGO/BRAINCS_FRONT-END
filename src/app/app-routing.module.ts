import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './docente/home/home.component';
import { HomeAlumnoComponent } from './alumno/home-alumno/home-alumno.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'homeAlumnos', component: HomeAlumnoComponent},
  {
    path: 'docente',
    loadChildren: () => import('./docente/docente.module').then(m => m.DocenteModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoModule)
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
