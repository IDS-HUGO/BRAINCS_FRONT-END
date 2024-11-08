import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGroupComponent } from './card-group/card-group.component';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { CardActivityComponent } from './card-activity/card-activity.component';
import { AuthModule } from '../auth/auth.module';
import { RoutingDocenteModule } from './routing-docente/routing-docente.module';
import { HeaderGroupComponent } from '../layout/header-group/header-group.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';

@NgModule({
  declarations: [
    HeaderGroupComponent,
    CardGroupComponent,
    MenuModalComponent,
    ViewGroupComponent,
    CardActivityComponent,
    HomeDocenteComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RoutingDocenteModule
  ],
  exports: [ HomeDocenteComponent ]
})
export class DocenteModule { }