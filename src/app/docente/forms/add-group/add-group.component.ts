import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { GroupServiceService } from '../../services/group-service.service';
import { GroupData } from '../../models/group-data';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  asignatura: string = '';
  grado: number | null = null;
  grupo: string = '';
  idDocente: number | null = null;

  constructor(
    private modalService: ModalService,
    private groupService: GroupServiceService
  ) {
    const storedIdDocente = localStorage.getItem('id_docente');
    this.idDocente = storedIdDocente ? parseInt(storedIdDocente, 10) : null;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addGroup() {
    if (this.idDocente === null) {
      console.error('ID del docente no encontrado.');
      return;
    }

    const newGroup: GroupData = {
      id_grupo: 0,
      asignatura: this.asignatura,
      grado: this.grado!,
      grupo: this.grupo,
      id_docente: this.idDocente
    };

    this.groupService.addGroup(newGroup).subscribe({
      next: (response) => {
        console.log('Grupo agregado con éxito', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al agregar el grupo', error);
      }
    });
  }
}