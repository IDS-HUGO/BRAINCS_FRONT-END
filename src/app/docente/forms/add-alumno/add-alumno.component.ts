import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrl: './add-alumno.component.css'
})
export class AddAlumnoComponent {

  constructor (private modalService : ModalService) {}

  nombres : string = ""
  apellidoPaterno : string = ""
  apellidoMaterno : string = ""

  closeModal(){
    this.modalService.closeModal()
  }


}
