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
        this.router.navigate(['/docente/view-group']);
        break;
      case 'edit':
        this.modalService.openUpdateModal(this.groupId);
        break;
      case 'delete':
        console.log(this.groupId);
        this.modalService.openDeleteModal(this.groupId);
        break;
    }
    this.showModal = false;
  }   

  navigateToDetail() {
    this.router.navigate(['alumno/view']);
  }

  closeDeleteModal() {
    this.showModal = false;
  }
}