import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DocenteModule } from "../docente/docente.module";



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DocenteModule
]
})
export class HomeModule { }
