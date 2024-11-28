import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocenteModalComponent } from './add-docente-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddDocenteModalComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    AddDocenteModalComponent
    ]
})
export class AddDocenteModalModule { }
