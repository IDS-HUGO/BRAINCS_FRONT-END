import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrl: './temario.component.css'
})
export class TemarioComponent {
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Input() userType: string = 'alumno';
  @Output() openModal = new EventEmitter<any>();
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
