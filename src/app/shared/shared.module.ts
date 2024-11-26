import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderGroupComponent } from './layout/header-group/header-group.component';
import { GenericCardComponent } from './cards/generic-card/generic-card.component';
import { CardGroupComponent } from './cards/card-group/card-group.component';
import { MenuModalsComponent } from './modals/menu-modals/menu-modals.component';
import { CardActivityComponent } from './cards/card-activity/card-activity.component';
import { FormAddModalComponent } from './modals/form-add-modal/form-add-modal.component';
import { FormUpdateModalComponent } from './modals/form-update-modal/form-update-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { FormsDocenteModule } from "../docente/forms/formsDocente.module";
import { CardDocenteComponent } from './cards/card-docente/card-docente.component';
import { LoaderComponent } from './loader/loader.component';
import { CardTemarioComponent } from './cards/card-temario/card-temario.component';
import { ProfileModalComponent } from './layout/profile-modal/profile-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    MenuModalsComponent,
    CardActivityComponent,
    FormAddModalComponent,
    FormUpdateModalComponent,
    DeleteModalComponent,
    CardDocenteComponent,
    LoaderComponent,
    CardTemarioComponent,
    ProfileModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsDocenteModule,
    HttpClientModule,
],
  exports : [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    CardActivityComponent,
    FormAddModalComponent,
    CardDocenteComponent,
    DeleteModalComponent,
    LoaderComponent,
    FormUpdateModalComponent,
    DeleteModalComponent,
    CardTemarioComponent,
    ProfileModalComponent
  ]
})
export class SharedModule { }
