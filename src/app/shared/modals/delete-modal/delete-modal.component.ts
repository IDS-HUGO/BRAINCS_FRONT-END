import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modals/services/modal.service';
import { GroupServiceService } from '../../../docente/services/group-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  modalType: string = '';
  groupId: number | null = null;
  private groupIdSubscription: Subscription | undefined;

  constructor(
    private modalService: ModalService,
    private groupService : GroupServiceService
  ) {}

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

  closeModal() {
    this.modalService.closeModal();
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
  
}