import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.css']
})
export class AddTareaComponent {
  modalOpen: boolean = false;

  @Output() addTarea = new EventEmitter<void>();

  selectedActivity: any = null;
  isModalOpen = false;

  constructor(private modalService: ModalService) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  openContentModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  onAddContent() {
    this.modalService.openModal('contenido');
  }
}