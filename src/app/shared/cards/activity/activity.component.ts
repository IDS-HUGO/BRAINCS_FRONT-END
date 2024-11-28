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

  toggleModal() {
    this.showModal = !this.showModal;
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
