import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ModalService } from '../../modals/services/modal.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Output() openModal = new EventEmitter<any>();
  @Input() userType: string = 'alumno';
  showModal: boolean = false;

  constructor (
    private modalService : ModalService,
    private activityService: ActivityService
  ) {}

  toggleModal() {
    if (this.userType !== 'alumno') {
      this.showModal = !this.showModal;
    }
  }

  onCardClick() {
    this.activityService.setSelectedActivity(this.cardData);
    this.modalService.openModal('inspect-activity')
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
