import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../modals/services/modal.service';
import { TemarioSelectedService } from '../services/temario-selected.service';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent {
  @Input() userType: string = 'alumno';
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Output() openModal = new EventEmitter<any>();
  temarioId : number = 0;
  showModal: boolean = false;

  ngOnInit() {
    console.log('Datos recibidos en Temario:', this.cardData);
  }  

  constructor(
    private modalService: ModalService,
    private temarioSelected : TemarioSelectedService
  ) {}

  toggleModal(event : MouseEvent) {
    event.stopPropagation();
    if (this.userType !== 'alumno') {
      this.showModal = !this.showModal;
    }
  }

  onCardClick(event: MouseEvent) {
    event.stopPropagation();
    console.log('Emitir evento con datos:', this.cardData);
    this.temarioSelected.setSelectedTemario(this.cardData);
    this.modalService.openModal('inspect-temario');
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