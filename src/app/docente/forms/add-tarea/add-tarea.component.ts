import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
ModalService

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrl: './add-tarea.component.css'
})
export class AddTareaComponent {
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
