import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesAlumnoComponent } from '../actividades-alumno/actividades-alumno.component';

const routes: Routes = [
  { path: 'view-act', component: ActividadesAlumnoComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingAlumnoModule {}
