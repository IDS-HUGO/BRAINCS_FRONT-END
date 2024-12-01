import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { GroupServiceService } from '../../services/group-service.service';
import { GroupData } from '../../models/group-data';
import { LoaderService } from '../../../shared/modals/services/loader.service';  // Importando LoaderService
import { AlertService } from '../../../shared/modals/services/alert.service';    // Importando AlertService

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
    private groupService: GroupServiceService,
    public loaderService: LoaderService,  
    private alertService: AlertService    
  ) {
    const storedIdDocente = localStorage.getItem('id_docente');
    this.idDocente = storedIdDocente ? parseInt(storedIdDocente) : null;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addGroup() {
    if (this.idDocente === null) {
      this.alertService.showWarning('No se ha encontrado el ID del docente en el almacenamiento local.');
      return;
    }

    if (!this.asignatura || !this.grado || !this.grupo) {
      this.alertService.showWarning('Por favor, complete todos los campos antes de continuar.');
      return;
    }

    const newGroup: GroupData = {
      id_grupo: 0,
      asignatura: this.asignatura,
      grado: this.grado!,
      grupo: this.grupo,
      id_docente: this.idDocente
    };

    this.loaderService.show();  
    this.groupService.addGroup(newGroup).subscribe({
      next: (response) => {
        this.loaderService.hide();  
       this.alertService.showSuccess('Grupo agregado con éxito');
        this.closeModal();
      },
      error: (error) => {
        this.loaderService.hide();  
        this.alertService.showError(error.status);
        console.error('Error al agregar el grupo', error);
      }
    });
  }
}
