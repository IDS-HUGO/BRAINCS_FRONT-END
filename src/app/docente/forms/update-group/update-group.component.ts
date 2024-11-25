import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../services/group-service.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { GroupData } from '../../models/group-data';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  @Input() groupId: number | null = null;

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

  ngOnInit() {
    this.modalService.groupId$.subscribe((id) => {
      this.groupId = id;
      if (this.groupId) {
        this.loadGroupDetails();
      }
    });
  }  

  closeModal() {
    this.modalService.closeModal();
  }

  loadGroupDetails() {
    if (this.groupId === null) return;

    this.groupService.getGroupById(this.groupId).subscribe({
      next: (group: GroupData) => {
        this.asignatura = group.asignatura;
        this.grado = group.grado;
        this.grupo = group.grupo;
      },
      error: (error) => {
        console.error('Error al cargar los detalles del grupo', error);
      }
    });
  }

  updateGroup() {
    if (this.idDocente === null || this.groupId === null) {
      console.error('ID del docente o del grupo no encontrado.');
      return;
    }

    const updatedGroup: Partial<GroupData> = {
      asignatura: this.asignatura,
      grado: this.grado!,
      grupo: this.grupo,
      id_docente: this.idDocente
    };

    this.groupService.updateGroup(this.groupId, updatedGroup).subscribe({
      next: (response) => {
        console.log('Grupo actualizado con éxito', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al actualizar el grupo', error);
      }
    });
  }
}