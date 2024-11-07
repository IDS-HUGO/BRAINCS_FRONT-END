import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CardGroupComponent } from './card-group/card-group.component';
import { MenuModalComponent } from './menu-modal/menu-modal.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardGroupComponent,
    MenuModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HomeComponent
  ]
})
export class DocenteModule { }
