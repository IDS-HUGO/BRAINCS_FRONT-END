import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  @Input() cardData: any;
  @Output() openModal = new EventEmitter<any>();
  showModal: boolean = false;
  @Input() userType: string = 'alumno';

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
      case 'inspect':
        break;
      case 'edit':
        break;
      case 'delete':
        break;
    }
    this.showModal = false;
  }
}
