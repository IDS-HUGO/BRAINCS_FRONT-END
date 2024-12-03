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
      this.openModal.emit(this.cardData);
      this.modalService.openModal('inspect-temario');
    }  

    handleOption(option: string) {
      switch (option) {
        case 'edit':
          this.modalService.openModal('editTemario');
          this.temarioSelected.setSelecteTemarioId(this.cardData.id_temario);
          console.log('Emitir evento con ID del temario:', this.cardData.id_temario);
          break;
        case 'delete':
          console.log('Eliminar temario:', this.cardData.id_temario);
          this.modalService.openModal('deleteTemario')
          this.temarioSelected.setSelecteTemarioId(this.cardData.id_temario);
          console.log('Emitir evento con ID del temario:', this.cardData.id_temario);
          break;
      }
      this.showModal = false;
    }
    
  }