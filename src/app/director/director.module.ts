import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDirectorComponent } from './home-director/home-director.component';
import { HeaderComponent } from './header/header.component';
import { AddDocenteModalComponent } from './add-docente-modal/add-docente-modal.component';
import { ViewUsuarioModalComponent } from './view-usuario-modal/view-usuario-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeDirectorComponent,
    HeaderComponent,
    AddDocenteModalComponent,
    ViewUsuarioModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    HomeDirectorComponent,
    ]
  })
export class DirectorModule { }
