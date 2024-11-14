import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGroupComponent } from './home-docente/card-group/card-group.component';
import { MenuModalComponent } from './home-docente/menu-modal/menu-modal.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { CardActivityComponent } from './view-group/card-activity/card-activity.component';
import { AuthModule } from '../auth/auth.module';
import { RoutingDocenteModule } from './routing-docente/routing-docente.module';
import { HeaderGroupComponent } from '../layout/header-group/header-group.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { ModalViewActivityComponent } from './view-group/modal-view-activity/modal-view-activity.component';

@NgModule({
  declarations: [
    HeaderGroupComponent,
    CardGroupComponent,
    MenuModalComponent,
    ViewGroupComponent,
    CardActivityComponent,
    HomeDocenteComponent,
    ModalViewActivityComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RoutingDocenteModule
  ],
  exports: [ HomeDocenteComponent ]
})
export class DocenteModule { }