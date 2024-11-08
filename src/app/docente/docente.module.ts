import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CardGroupComponent } from './card-group/card-group.component';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { CardActivityComponent } from './card-activity/card-activity.component';
import { AuthModule } from '../auth/auth.module';
import { RoutingDocenteModule } from './routing-docente/routing-docente.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardGroupComponent,
    MenuModalComponent,
    ViewGroupComponent,
    CardActivityComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RoutingDocenteModule
  ],
  exports: [
    HomeComponent
  ]
})
export class DocenteModule { }