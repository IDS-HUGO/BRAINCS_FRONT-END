import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css'
})
export class CardGroupComponent {
  @Input() subjectName: string = 'Matematicas I';
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
    console.log('showModal:', this.showModal);
  }  

  handleOption(option: string) {
    if (option === 'inspect') {
      console.log('Inspeccionar opción seleccionada');
    } else if (option === 'edit') {
      console.log('Editar opción seleccionada');
    } else if (option === 'delete') {
      console.log('Eliminar opción seleccionada');
    }
  }

}
