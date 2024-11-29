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
  @Input() groupId!: number;
  showModal: boolean = false;

  constructor(private router: Router, private modalService: ModalService) {}

  toggleModal() {
    if (this.userType === 'director' || this.userType === 'docente') {
      this.showModal = !this.showModal;
    }
  }

  handleOption(option: string) {
    switch(option) {
      case 'inspect':
        this.router.navigate(['/docente/view-group',this.groupId,this.grado,this.grupo]);
        break;
      case 'edit':
        this.modalService.openUpdateModal(this.groupId);
        break;
      case 'delete':
        this.modalService.openDeleteModal(this.groupId);
        break;
    }
    this.showModal = false;
  }   

  navigateToDetail() {
    console.log('grupo:', this.grupo);  
    
    if ( this.grado && this.grupo) {
      this.router.navigate(['alumno/view',  this.grado, this.grupo]);
    } else {
      console.error('Faltan parámetros necesarios para la navegación.');
    }
  }
  
  

  closeDeleteModal() {
    this.showModal = false;
  }
}