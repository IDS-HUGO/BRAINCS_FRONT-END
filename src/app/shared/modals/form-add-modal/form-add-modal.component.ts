import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-form-add-modal',
  templateUrl: './form-add-modal.component.html',
  styleUrls: ['./form-add-modal.component.css']
})
export class FormAddModalComponent {
  modalOpen: boolean = false;

  constructor(private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
