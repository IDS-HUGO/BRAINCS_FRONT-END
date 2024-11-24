import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
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

  confirmDelete() {
    console.log('Elemento eliminado');
    this.closeModal();
  }
}