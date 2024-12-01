import { Component, Input } from '@angular/core';
import { ModalService } from '../../shared/modals/services/modal.service';
import { DocenteService } from '../Service/docente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-docente',
  templateUrl: './delete-docente.component.html',
  styleUrl: './delete-docente.component.css'
})
export class DeleteDocenteComponent {
  constructor (
    private modalService : ModalService,
    private docenteService : DocenteService
  ) {}
  

  modalOpen: boolean = false;
  modalType: string = '';
  @Input() docenteId!: number | null;
  private groupIdSubscription: Subscription | undefined;
  
  ngOnInit() {
    this.groupIdSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  
    this.modalService.modalType$.subscribe(type => {
      this.modalType = type;
    });
  
    this.modalService.groupId$.subscribe(id_docente => {
      this.docenteId = id_docente;
      console.log('ID del grupo a eliminar:', this.docenteId);
    });
  }

  ngOnDestroy() {
    if (this.groupIdSubscription) {
      this.groupIdSubscription.unsubscribe();
    }
  }

  

  confirmDelete(docenteId: number | null) {
    if (docenteId === null) {
      console.error('No docente ID provided');
      return;
    }
  
    this.docenteService.deleteDocente(docenteId).subscribe(
      () => {
        console.log('Docente eliminado');
      },
      (error) => {
        console.error('Error al eliminar docente', error);
      }
    );
  }
  


  closeModal() {
    this.modalService.closeModal();
  }


}
