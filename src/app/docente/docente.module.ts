import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingDocenteModule } from './routing-docente/routing-docente.module';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ViewActivityComponent } from './view-group/view-activity/view-activity.component';
import { ViewAlumnosComponent } from './view-group/view-alumnos/view-alumnos.component';
import { ViewTemarioComponent } from './view-group/view-temario/view-temario.component';
import { SharedModule } from '../shared/shared.module';
import { FormsDocenteModule } from "./forms/formsDocente.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewGroupComponent,
    HomeDocenteComponent,
    ViewActivityComponent,
    ViewAlumnosComponent,
    ViewTemarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingDocenteModule,
    FormsDocenteModule,
    FormsModule
],
  exports: [ HomeDocenteComponent ]
})
export class DocenteModule { }