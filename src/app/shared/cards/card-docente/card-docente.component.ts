import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../modals/services/modal.service';
import { DocenteService } from '../../../director/Service/docente.service';
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

  constructor(private router: Router, private modalService: ModalService, private docenteService: DocenteService
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

  navigateToGroupDocente() {
    // Redirige a la vista de detalles del grupo del docente
    this.router.navigate(['/docente/group-docente', this.docenteId]);
  }

  handleDelete(docenteId: number) {
    // Aquí puedes agregar la lógica para eliminar al docente
    this.docenteService.deleteDocente(docenteId).subscribe(
      () => {
        console.log('Docente eliminado');
        // Puedes agregar un método para actualizar la lista de docentes o notificar al usuario
      },
      (error) => {
        console.error('Error al eliminar docente', error);
      }
    );
  }


}