import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderGroupComponent } from './layout/header-group/header-group.component';
import { GenericCardComponent } from './cards/generic-card/generic-card.component';
import { CardGroupComponent } from './cards/card-group/card-group.component';
import { MenuModalsComponent } from './modals/menu-modals/menu-modals.component';
import { CardActivityComponent } from './cards/card-activity/card-activity.component';
import { FormsDocenteModule } from "../docente/forms/formsDocente.module";
import { CardDocenteComponent } from './cards/card-docente/card-docente.component';
import { LoaderComponent } from './loader/loader.component';
import { CardTemarioComponent } from './cards/card-temario/card-temario.component';
import { ProfileModalComponent } from './layout/profile-modal/profile-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDocenteModalModule } from '../director/add-docente-modal/add-docente-modal.module';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    MenuModalsComponent,
    CardActivityComponent,
    CardDocenteComponent,
    LoaderComponent,
    CardTemarioComponent,
    ProfileModalComponent,
    GenericModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsDocenteModule,
    AddDocenteModalModule,
    HttpClientModule,
],
  exports : [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    CardActivityComponent,
    CardDocenteComponent,
    LoaderComponent,
    CardTemarioComponent,
    ProfileModalComponent,
    GenericModalComponent
  ]
})
export class SharedModule { }
