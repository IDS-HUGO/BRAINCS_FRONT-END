import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './add-group/add-group.component';
import { FormsModule } from '@angular/forms';
import { AddTareaComponent } from './add-tarea/add-tarea.component';
import { AddContenidoComponent } from './add-contenido/add-contenido.component';
import { AddContenidoIAComponent } from './add-contenido-ia/add-contenido-ia.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { AddTemarioComponent } from './add-temario/add-temario.component';



@NgModule({
  declarations: [
    AddGroupComponent,
    AddTareaComponent,
    AddContenidoComponent,
    AddContenidoIAComponent,
    UpdateGroupComponent,
    UpdateActivityComponent,
    DeleteGroupComponent,
    AddAlumnoComponent,
    AddTemarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
],
  exports : [
    AddGroupComponent,
    AddTareaComponent,
    AddAlumnoComponent,
    AddContenidoComponent,
    AddContenidoIAComponent,
    AddTemarioComponent,
    UpdateGroupComponent,
    UpdateActivityComponent,
    DeleteGroupComponent
  ]
})
export class FormsDocenteModule { }
