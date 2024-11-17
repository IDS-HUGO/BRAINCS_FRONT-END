import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-modals',
  templateUrl: './menu-modals.component.html',
  styleUrl: './menu-modals.component.css'
})
export class MenuModalsComponent {

  @Input() showModal: boolean = false;
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
