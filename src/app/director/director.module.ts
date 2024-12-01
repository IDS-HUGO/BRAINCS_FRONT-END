import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDirectorComponent } from './home-director/home-director.component';
import { HeaderComponent } from './header/header.component';
import { ViewUsuarioModalComponent } from './view-usuario-modal/view-usuario-modal.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DocenteListComponent } from './docente-list/docente-list.component';
import { SharedModule } from "../shared/shared.module";
import { SchoolInfoModalComponent } from './school-info-modal/school-info-modal.component';
import { GroupDocentComponent } from './group-docent/group-docent.component';
@NgModule({
  declarations: [
    HomeDirectorComponent,
    HeaderComponent,
    ViewUsuarioModalComponent,
    DocenteListComponent,
    SchoolInfoModalComponent,
    GroupDocentComponent,
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
