import { Component, Input, OnInit } from '@angular/core';
import { GroupServiceService } from '../../services/group-service.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { GroupData } from '../../models/group-data';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

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
    private groupService: GroupServiceService,
    public loaderService: LoaderService,  
    private alertService: AlertService   
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
      this.alertService.showError(400, 'Error en la actualización');
      return;
    }

    const updatedGroup: Partial<GroupData> = {
      asignatura: this.asignatura,
      grado: this.grado!,
      grupo: this.grupo,
      id_docente: this.idDocente
    };

    this.loaderService.show();  
    this.groupService.updateGroup(this.groupId, updatedGroup).subscribe({
      next: (response) => {
        this.loaderService.hide();  
        this.alertService.showSuccess('Grupo actualizado con éxito');
        this.closeModal();
      },
      error: (error) => {
        this.loaderService.hide(); 
       this.alertService.showError(error.status);
        console.error('Error al actualizar el grupo', error);
      }
    });
  }
}
