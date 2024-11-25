import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-form-update-modal',
  templateUrl: './form-update-modal.component.html',
  styleUrl: './form-update-modal.component.css'
})
export class FormUpdateModalComponent {

  modalOpen: boolean = false;
  modalType: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    this.modalService.modalType$.subscribe(type => {
      this.modalType = type;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
