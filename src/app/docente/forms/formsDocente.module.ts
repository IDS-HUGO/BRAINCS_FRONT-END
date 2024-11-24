import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './add-group/add-group.component';
import { FormsModule } from '@angular/forms';
import { AddTareaComponent } from './add-tarea/add-tarea.component';



@NgModule({
  declarations: [
    AddGroupComponent,
    AddTareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    AddGroupComponent,
    AddTareaComponent
  ]
})
export class FormsDocenteModule { }
