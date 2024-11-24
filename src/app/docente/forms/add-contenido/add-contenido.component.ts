import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-contenido',
  templateUrl: './add-contenido.component.html',
  styleUrls: ['./add-contenido.component.css']
})
export class AddContenidoComponent {
  selectedUploadType: string = 'file';

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }

  onUploadTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedUploadType = target.value;
  }
}
