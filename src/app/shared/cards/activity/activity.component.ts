import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../modals/services/modal.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  @Input() userType: string = 'alumno';
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Output() openModal = new EventEmitter<any>();
  activityId : number = 0
  showModal: boolean = false;

  constructor (
    private modalService: ModalService,
    private activityService: ActivityService
  ) {}

  toggleModal(event: MouseEvent) {
    event.stopPropagation();

    if (this.userType !== 'alumno') {
      this.showModal = !this.showModal;
    }
  }

  onCardClick(event: MouseEvent) {
    event.stopPropagation();
    this.activityService.setSelectedActivity(this.cardData);
    this.activityService.setSelectedActivityId(this.cardData?.id_actividad);
    this.modalService.openModal('inspect-activity');
  }

  handleOption(option: string) {
    switch (option) {
      case 'edit':
        this.activityId = this.cardData?.id_actividad;
        this.activityService.setSelectedActivityId(this.activityId);
        this.modalService.openModal('editActivity');
        console.log('ID de la actividad para editar:', this.activityId);
        break;
        case 'delete':
          this.activityId = this.cardData?.id_actividad;
          this.activityService.setSelectedActivityId(this.activityId);
          this.modalService.openModal('deleteActivity');
          console.log('ID de la actividad para eliminar:', this.activityId);
          break;        
    }
    this.showModal = false;
  }
}
