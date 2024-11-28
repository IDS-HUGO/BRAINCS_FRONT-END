import { Component } from '@angular/core';

import { GroupServiceService } from '../../services/group-service.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrl: './delete-group.component.css'
})
export class DeleteGroupComponent {

  constructor (
    private modalService : ModalService,
    private groupService : GroupServiceService
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
      this.groupService.deleteGroup(this.groupId, idDocente).subscribe({
        next: () => {
          console.log(`Grupo con ID ${this.groupId} eliminado exitosamente`);
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error al eliminar el grupo:', error);
        }
      });
    } else {
      console.error('ID del grupo o ID del docente no está definido.');
    }
  }


  closeModal() {
    this.modalService.closeModal();
  }

}
