import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGroupComponent } from './home-docente/card-group/card-group.component';
import { MenuModalComponent } from './home-docente/menu-modal/menu-modal.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { CardActivityComponent } from './view-group/view-activity/card-activity/card-activity.component';
import { AuthModule } from '../auth/auth.module';
import { RoutingDocenteModule } from './routing-docente/routing-docente.module';
import { HeaderGroupComponent } from '../layout/header-group/header-group.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { ModalViewActivityComponent } from './view-group/modal-view-activity/modal-view-activity.component';
import { ViewActivityComponent } from './view-group/view-activity/view-activity.component';
import { ViewAlumnosComponent } from './view-group/view-alumnos/view-alumnos.component';
import { ViewTemarioComponent } from './view-group/view-temario/view-temario.component';
import { CardTemarioComponent } from './view-group/view-temario/card-temario/card-temario.component';
import { CardAlumnoComponent } from './view-group/view-alumnos/card-alumno/card-alumno.component';

@NgModule({
  declarations: [
    HeaderGroupComponent,
    CardGroupComponent,
    MenuModalComponent,
    ViewGroupComponent,
    CardActivityComponent,
    HomeDocenteComponent,
    ModalViewActivityComponent,
    ViewActivityComponent,
    ViewAlumnosComponent,
    ViewTemarioComponent,
    CardTemarioComponent,
    CardAlumnoComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RoutingDocenteModule
  ],
  exports: [ HomeDocenteComponent ]
})
export class DocenteModule { }