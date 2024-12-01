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
import { DeleteActivityComponent } from './delete-activity/delete-activity.component';
import { UpdateTemarioComponent } from './update-temario/update-temario.component';
import { DeleteTemarioComponent } from './delete-temario/delete-temario.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { UpdateAlumnoComponent } from './update-alumno/update-alumno.component';



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
    AddTemarioComponent,
    DeleteActivityComponent,
    UpdateTemarioComponent,
    DeleteTemarioComponent,
    DeleteAlumnoComponent,
    UpdateAlumnoComponent
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
    UpdateTemarioComponent,
    DeleteGroupComponent,
    DeleteActivityComponent
  ]
})
export class FormsDocenteModule { }
