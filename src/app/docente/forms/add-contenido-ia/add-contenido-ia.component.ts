import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-contenido-ia',
  templateUrl: './add-contenido-ia.component.html',
  styleUrl: './add-contenido-ia.component.css'
})
export class AddContenidoIAComponent {
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
    this.modalService.openModal('contenido')
  }

  openContentModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }



}
