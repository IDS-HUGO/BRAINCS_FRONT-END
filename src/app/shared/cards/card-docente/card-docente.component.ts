import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../modals/services/modal.service';
import { DocenteService } from '../../../director/Service/docente.service';
import { DocentService } from '../services/docent.service';
@Component({
  selector: 'app-card-docente',
  templateUrl: './card-docente.component.html',
  styleUrls: ['./card-docente.component.css']
})
export class CardDocenteComponent implements OnInit {
  @Input() subjectName!: string;
  @Input() userType!: string;
  @Input() grado!: number;
  @Input() cardData: any;
  @Input() grupo!: string;
  @Input() docenteId!: number;
  @Input() userImage!: string;
  showModal: boolean = false;

  constructor(private router: Router, private modalService: ModalService, private docenteService: DocenteService, private docentService: DocentService
  ) {}

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
      return;
    }
  
    switch(option) {
      case 'inspect':
        if (this.docenteId !== undefined) {
          this.router.navigate(['/docente/group-docent', this.docenteId]);
        }
        break;
      case 'edit':
        this.docentService.setSelectedDocenteId(this.docenteId);
          this.modalService.openModal('editDocente');
          console.log('ID del Docente para editar:', this.docenteId);
          break;   
        break;
      case 'delete':
          this.docentService.setSelectedDocenteId(this.docenteId);
          this.modalService.openModal('deleteDocente');
          console.log('ID del Docente para eliminar:', this.docenteId);
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