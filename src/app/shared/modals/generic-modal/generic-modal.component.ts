import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.css'
})
export class GenericModalComponent {

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
