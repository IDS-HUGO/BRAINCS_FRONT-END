import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocenteModalComponent } from './add-docente-modal/add-docente-modal.component';
import { DeleteDocenteComponent } from './delete-docente/delete-docente.component';
import { FormsModule } from '@angular/forms';
import { UpdateDocenteComponent } from './update-docente/update-docente.component';



@NgModule({
  declarations: [
    AddDocenteModalComponent,
    DeleteDocenteComponent,
    UpdateDocenteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    AddDocenteModalComponent,
    DeleteDocenteComponent,
    UpdateDocenteComponent
  ]
})
export class FormsDirecModule { }
