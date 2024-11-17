import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderGroupComponent } from './layout/header-group/header-group.component';
import { GenericCardComponent } from './cards/generic-card/generic-card.component';
import { CardGroupComponent } from './cards/card-group/card-group.component';
import { MenuModalsComponent } from './modals/menu-modals/menu-modals.component';
import { CardActivityComponent } from './cards/card-activity/card-activity.component';
import { FormAddModalComponent } from './modals/form-add-modal/form-add-modal.component';
import { FormUpdateModalComponent } from './modals/form-update-modal/form-update-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';



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
    DeleteModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    CardActivityComponent,
    FormAddModalComponent
  ]
})
export class SharedModule { }
