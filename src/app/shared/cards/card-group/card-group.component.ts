import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent {
  @Input() subjectName!: string;
  @Input() userType!: string;
  showModal: boolean = false;

  constructor(private router: Router) {}

  toggleModal() {
    if (this.userType === 'director' || this.userType === 'docente') {
      this.showModal = !this.showModal;
      console.log('Modal status:', this.showModal);
    }
  }  

  handleOption(option: string) {
    switch(option) {
      case 'inspect':
        console.log('Inspeccionar opción seleccionada');
        this.router.navigate(['/docente/view-group']);
        break;
      case 'edit':
        console.log('Editar opción seleccionada');
        break;
      case 'delete':
        console.log('Eliminar opción seleccionada');
        break;
    }
    this.showModal = false;
  }
 
  navigateToDetail() {
    this.router.navigate(['alumno/view']); 
  }
}