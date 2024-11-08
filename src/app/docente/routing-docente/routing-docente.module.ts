import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGroupComponent } from '../view-group/view-group.component';

const routes: Routes = [
  { path: 'view-group', component: ViewGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingDocenteModule { }