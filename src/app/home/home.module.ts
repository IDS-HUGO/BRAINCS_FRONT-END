import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DocenteModule } from "../docente/docente.module";
import { AlumnoModule } from '../alumno/alumno.module';
import { DirectorModule } from '../director/director.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DocenteModule,
    AlumnoModule,
    DirectorModule
]
})
export class HomeModule { }
