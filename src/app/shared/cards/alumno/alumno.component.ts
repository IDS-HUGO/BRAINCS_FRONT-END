import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../modals/services/modal.service';
import { AlumnoSelectedService } from '../services/alumno-selected.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Output() openModal = new EventEmitter<any>();
  showModal: boolean = false;

  constructor (
    private modalService : ModalService,
    private alumnoSelectedService: AlumnoSelectedService
  ) {}

  onCardClick(event: MouseEvent) {
    event.stopPropagation();
    this.alumnoSelectedService.setSelectedAlumno(this.cardData);
    this.openModal.emit(this.cardData);
    this.modalService.openModal('inspect-alumno');
  }  

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleOption(option: string) {
    switch (option) {
      case 'edit':
        break;
      case 'delete':
        break;
    }
    this.showModal = false;
  }
}