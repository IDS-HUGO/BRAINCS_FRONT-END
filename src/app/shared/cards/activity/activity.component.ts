import { Component, Input, Output, EventEmitter  } from '@angular/core';

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

  toggleModal() {
    if (this.userType !== 'alumno') {
      this.showModal = !this.showModal;
    }
  }

  onCardClick() {
    this.openModal.emit(this.cardData);
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
