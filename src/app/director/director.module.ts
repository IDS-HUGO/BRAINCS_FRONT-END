import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDirectorComponent } from './home-director/home-director.component';
import { HeaderComponent } from './header/header.component';
import { AddDocenteModalComponent } from './add-docente-modal/add-docente-modal.component';
import { ViewUsuarioModalComponent } from './view-usuario-modal/view-usuario-modal.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DocenteListComponent } from './docente-list/docente-list.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    HomeDirectorComponent,
    HeaderComponent,
    AddDocenteModalComponent,
    ViewUsuarioModalComponent,
    DocenteListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
],
  exports:[
    HomeDirectorComponent,
    ]
  })
export class DirectorModule { }
