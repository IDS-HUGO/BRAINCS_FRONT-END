import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderGroupComponent } from './layout/header-group/header-group.component';
import { GenericCardComponent } from './cards/generic-card/generic-card.component';
import { CardGroupComponent } from './cards/card-group/card-group.component';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { GenericModalProcessComponent } from './modals/generic-modal-process/generic-modal-process.component';
import { MenuModalsComponent } from './modals/menu-modals/menu-modals.component';
import { CardActivityComponent } from './cards/card-activity/card-activity.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    GenericModalComponent,
    GenericModalProcessComponent,
    MenuModalsComponent,
    CardActivityComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HeaderComponent,
    HeaderGroupComponent,
    GenericCardComponent,
    CardGroupComponent,
    CardActivityComponent
  ]
})
export class SharedModule { }
