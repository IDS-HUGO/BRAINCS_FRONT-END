import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-group',
  templateUrl: './header-group.component.html',
  styleUrl: './header-group.component.css'
})
export class HeaderGroupComponent {

  @Output() viewSelected = new EventEmitter<string>();

  selectView(view: string) {
    this.viewSelected.emit(view);
  }

}
