import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGroupAlumnComponent } from '../view-group-alumn/view-group-alumn.component';

const routes: Routes = [
  { path: 'view', component: ViewGroupAlumnComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingAlumnoModule {}
