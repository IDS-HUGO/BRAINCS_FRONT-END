import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CardGroupComponent } from './card-group/card-group.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HomeComponent
  ]
})
export class DocenteModule { }
