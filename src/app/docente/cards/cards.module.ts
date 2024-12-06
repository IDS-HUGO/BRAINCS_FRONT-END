import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectActivityComponent } from './inspect-activity/inspect-activity.component';
import { InspectTemarioComponent } from './inspect-temario/inspect-temario.component';
import { InspectAlumnoComponent } from './inspect-alumno/inspect-alumno.component';



@NgModule({
  declarations: [
    InspectActivityComponent,
    InspectTemarioComponent,
    InspectAlumnoComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    InspectActivityComponent,
    InspectTemarioComponent,
    InspectAlumnoComponent
  ]
})
export class CardsModule { }
