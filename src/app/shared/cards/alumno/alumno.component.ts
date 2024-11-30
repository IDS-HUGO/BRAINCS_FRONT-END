import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  @Input() cardData: any;
  @Input() isGroupView: boolean = true;
  @Output() openModal = new EventEmitter<any>();
  showModal: boolean = false;
  alumno : string = ''

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
