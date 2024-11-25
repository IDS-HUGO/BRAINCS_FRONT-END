import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-contenido',
  templateUrl: './add-contenido.component.html',
  styleUrls: ['./add-contenido.component.css']
})
export class AddContenidoComponent {
  selectedUploadType: string = 'file';
  modalOpen: boolean = false;
  selectedActivity: any = null;
  isModalOpen : boolean = false;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.openModal('tarea');
  }

  onUploadTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedUploadType = target.value;
  }

  onAddContenidoIA(){
    this.modalService.openModal('contenidoIA');
  }

  openContentModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  onAddContent() {
    this.modalService.openModal('contenido');
  }
}
