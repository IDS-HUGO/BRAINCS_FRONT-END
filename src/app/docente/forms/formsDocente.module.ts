import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './add-group/add-group.component';
import { FormsModule } from '@angular/forms';
import { AddTareaComponent } from './add-tarea/add-tarea.component';
import { AddContenidoComponent } from './add-contenido/add-contenido.component';
import { AddContenidoIAComponent } from './add-contenido-ia/add-contenido-ia.component';
import { UpdateGroupComponent } from './update-group/update-group.component';



@NgModule({
  declarations: [
    AddGroupComponent,
    AddTareaComponent,
    AddContenidoComponent,
    AddContenidoIAComponent,
    UpdateGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
],
  exports : [
    AddGroupComponent,
    AddTareaComponent,
    AddContenidoComponent,
    UpdateGroupComponent
  ]
})
export class FormsDocenteModule { }
