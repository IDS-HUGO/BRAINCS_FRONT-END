import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './cards/generic-card/generic-card.component';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { GenericModalProcessComponent } from './modals/generic-modal-process/generic-modal-process.component';



@NgModule({
  declarations: [
    GenericCardComponent,
    GenericModalComponent,
    GenericModalProcessComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    GenericCardComponent
  ]
})
export class SharedModule { }
