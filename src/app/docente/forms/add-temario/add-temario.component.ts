import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-temario',
  templateUrl: './add-temario.component.html',
  styleUrl: './add-temario.component.css'
})
export class AddTemarioComponent {

  constructor (private modalService : ModalService){}

  closeModal(){
    this.modalService.closeModal()
  }

}
