import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DocenteModule } from "../docente/docente.module";
import { AlumnoModule } from '../alumno/alumno.module';
import { HeaderComponent } from '../layout/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DocenteModule,
    AlumnoModule
]
})
export class HomeModule { }
