import { Component } from '@angular/core';
import { GroupServiceService } from '../../services/group-service.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../shared/modals/services/loader.service';  
import { AlertService } from '../../../shared/modals/services/alert.service';    

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css']
})
export class DeleteGroupComponent {

  constructor(
    private modalService: ModalService,
    private groupService: GroupServiceService,
    public loaderService: LoaderService,  
    private alertService: AlertService    
  ) {}

  modalOpen: boolean = false;
  modalType: string = '';
  groupId: number | null = null;
  private groupIdSubscription: Subscription | undefined;

  ngOnInit() {
    this.groupIdSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    this.modalService.modalType$.subscribe(type => {
      this.modalType = type;
    });

    this.modalService.groupId$.subscribe(id => {
      this.groupId = id;
      console.log('ID del grupo a eliminar:', this.groupId);
    });
  }

  ngOnDestroy() {
    if (this.groupIdSubscription) {
      this.groupIdSubscription.unsubscribe();
    }
  }

  confirmDelete() {
    const storedIdDocente = localStorage.getItem('id_docente');
    const idDocente = storedIdDocente ? parseInt(storedIdDocente, 10) : null;

    if (this.groupId !== null && idDocente !== null) {
      this.loaderService.show();

      this.groupService.deleteGroup(this.groupId, idDocente).subscribe({
        next: () => {
          this.loaderService.hide();
          console.log(`Grupo con ID ${this.groupId} eliminado exitosamente`);
          this.alertService.showSuccess('Grupo eliminado con éxito');
          this.closeModal();
        },
        error: (error: any) => {
        this.loaderService.hide();
          console.error('Error al eliminar el grupo:', error);
          this.alertService.showError(error.status, 'Error al eliminar el grupo');
        }
      });
    } 
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
