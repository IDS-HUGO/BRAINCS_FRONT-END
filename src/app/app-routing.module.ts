import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ViewGroupComponent } from './docente/view-group/view-group.component';
import { ViewGroupAlumnComponent } from './alumno/view-group-alumn/view-group-alumn.component';
import { GroupDocentComponent } from './director/group-docent/group-docent.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'docente/view-group/:id/:grado/:grupo', component: ViewGroupComponent },
  { path: 'docente/group-docent/:docenteId', component: GroupDocentComponent},
  { path: 'alumno/view/:grado/:grupo', component: ViewGroupAlumnComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
