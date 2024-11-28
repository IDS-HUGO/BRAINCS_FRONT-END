import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrl: './temario.component.css'
})
export class TemarioComponent {
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
