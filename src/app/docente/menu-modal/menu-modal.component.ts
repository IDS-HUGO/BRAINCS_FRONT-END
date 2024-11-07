import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent {
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