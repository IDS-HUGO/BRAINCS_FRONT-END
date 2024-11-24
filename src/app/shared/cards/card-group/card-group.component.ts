import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../modals/services/modal.service';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent {
  @Input() subjectName!: string;
  @Input() userType!: string;
  @Input() grado!: number;
  @Input() grupo!: string;
  showModal: boolean = false;
  modalOpen: boolean = false; // Estado para controlar la visibilidad de app-delete-modal

  constructor(private router: Router, private modalService: ModalService) {}

  toggleModal() {
    if (this.userType === 'director' || this.userType === 'docente') {
      this.showModal = !this.showModal;
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
        this.modalService.openDeleteModal();  // Llama al método para abrir la modal de eliminación
        break;
    }
    this.showModal = false;  // Cierra el menú de opciones
  }  

  closeDeleteModal() {
    this.modalOpen = false;
  }

  navigateToDetail() {
    this.router.navigate(['alumno/view']);
  }
}