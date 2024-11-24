import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDirectorComponent } from './home-director/home-director.component';



@NgModule({
  declarations: [
    HomeDirectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeDirectorComponent
  ]
})
export class DirectorModule { }
