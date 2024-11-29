import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../modals/services/modal.service';

@Component({
  selector: 'app-card-docente',
  templateUrl: './card-docente.component.html',
  styleUrls: ['./card-docente.component.css']
})
export class CardDocenteComponent implements OnInit {
  @Input() subjectName!: string;
  @Input() userType!: string;
  @Input() grado!: number;
  @Input() grupo!: string;
  @Input() docenteId!: number;
  @Input() userImage!: string;
  showModal: boolean = false;

  constructor(private router: Router, private modalService: ModalService) {}

  ngOnInit() {
    console.log('docenteId:', this.docenteId);
  }

  
  toggleModal() {
    console.log('UserType:', this.userType); 
    if (this.userType === 'director' || this.userType === 'docente') {
      this.showModal = !this.showModal;
      console.log('ShowModal:', this.showModal); 
    }
  }
  

  handleOption(option: string) {
    if (!this.docenteId) {
      console.error('docenteId is undefined');
      return; // Exit if docenteId is undefined
    }
  
    switch(option) {
      case 'inspect':
        // Ensure docenteId is defined before navigating
        if (this.docenteId !== undefined) {
          this.router.navigate(['/docente/group-docent', this.docenteId]);
        }
        break;
      case 'edit':
        this.modalService.openUpdateModal(this.docenteId);
        break;
      case 'delete':
        this.modalService.openDeleteModal(this.docenteId);
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