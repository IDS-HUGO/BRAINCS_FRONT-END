import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-modals',
  templateUrl: './menu-modals.component.html',
  styleUrls: ['./menu-modals.component.css']
})
export class MenuModalsComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<string>();

  closeModalPopup() {
    this.closeModal.emit();
  }

  onOptionClick(option: string) {
    this.optionSelected.emit(option);
    this.closeModalPopup();
  }
}