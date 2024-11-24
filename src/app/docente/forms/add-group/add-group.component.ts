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
  idDocente: number = 1;

  constructor(
    private modalService: ModalService,
    private groupService: GroupServiceService
  ) {}

  closeModal() {
    this.modalService.closeModal();
  }

  addGroup() {
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
