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
  idAlumno : number = 0;
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

  toggleModal(event : MouseEvent) {
    event.stopPropagation()
    this.showModal = !this.showModal;
  }

  handleOption(option: string) {
    switch (option) {
      case 'edit':
        this.alumnoSelectedService.setSelectedAlumno(this.cardData);
        this.alumnoSelectedService.setSelecteAlumnoId(this.cardData.matricula);
        this.modalService.openModal('editAlumno');
        break;
      case 'delete':
          this.alumnoSelectedService.setSelectedAlumno(this.cardData); 
          this.alumnoSelectedService.setSelecteAlumnoId(this.cardData.matricula); 
          this.modalService.openModal('deleteAlumno'); 
        break;
    }
    this.showModal = false;
  }  
  
}