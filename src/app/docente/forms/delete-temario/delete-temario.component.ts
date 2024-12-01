import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TemarioSelectedService } from '../../../shared/cards/services/temario-selected.service';
import { TemarioService } from '../../services/temario.service';

@Component({
  selector: 'app-delete-temario',
  templateUrl: './delete-temario.component.html',
  styleUrls: ['./delete-temario.component.css']
})
export class DeleteTemarioComponent implements OnInit, OnDestroy {

  modalOpen: boolean = false;
  modalType: string = '';
  temarioId: number | null = null;
  private groupIdSubscription: Subscription | undefined;
  private temarioIdSubscription: Subscription | undefined;
  
  constructor(
    private modalService: ModalService,
    private temarioSelectedService: TemarioSelectedService,
    private temarioService: TemarioService
  ) {}

  ngOnInit(): void {
    this.groupIdSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    this.modalService.modalType$.subscribe(type => {
      this.modalType = type;
    });
    
    this.temarioIdSubscription = this.temarioSelectedService.selectedTemarioId$.subscribe(id => {
      this.temarioId = id;
      console.log('ID del temario a eliminar:', this.temarioId);
    });
  }

  ngOnDestroy(): void {
    if (this.groupIdSubscription) {
      this.groupIdSubscription.unsubscribe();
    }
    if (this.temarioIdSubscription) {
      this.temarioIdSubscription.unsubscribe();
    }
  }

  confirmDelete(): void {
    if (this.temarioId !== null) {
      this.temarioService.deleteTemario(this.temarioId).subscribe({
        next: () => {
          console.log(`Temario con ID ${this.temarioId} eliminado exitosamente`);
          this.closeModal();
        },
        error: (error: any) => {
          console.error('Error al eliminar el temario:', error);
        }
      });
    } else {
      console.error('ID del temario no está definido.');
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}