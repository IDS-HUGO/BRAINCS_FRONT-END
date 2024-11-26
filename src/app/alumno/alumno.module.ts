import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAlumnoComponent } from './home-alumno/home-alumno.component';
import { RouterModule } from '@angular/router';
import { RoutingAlumnoModule } from './routing-alumno/routing-alumno.module';
import { SharedModule } from '../shared/shared.module';
import { ViewGroupAlumnComponent } from './view-group-alumn/view-group-alumn.component';
import { ActAlumnComponent } from './view-group-alumn/act-alumn/act-alumn.component';
import { TemAlumnComponent } from './view-group-alumn/tem-alumn/tem-alumn.component';
import { StudentsAlumnComponent } from './view-group-alumn/students-alumn/students-alumn.component';
import { ChatbotAlumnComponent } from './view-group-alumn/chatbot-alumn/chatbot-alumn.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeAlumnoComponent,
    ViewGroupAlumnComponent,
    ActAlumnComponent,
    TemAlumnComponent,
    StudentsAlumnComponent,
    ChatbotAlumnComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RoutingAlumnoModule,
    FormsModule
  ],
  exports : [
    HomeAlumnoComponent
  ]
})
export class AlumnoModule { }
