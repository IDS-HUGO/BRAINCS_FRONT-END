import { Component, Input } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { DocenteService } from '../../Service/docente.service';
import { Subscription } from 'rxjs';
import { DocentService } from '../../../shared/cards/services/docent.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';

@Component({
  selector: 'app-delete-docente',
  templateUrl: './delete-docente.component.html',
  styleUrl: './delete-docente.component.css'
})
export class DeleteDocenteComponent {
  docenteId: number = 0;
  docentId: number =0;

  constructor (
    private modalService : ModalService,
    private docenteService : DocenteService,
    private docentService : DocentService,
    private route : ActivatedRoute,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}
  
  
  ngOnInit(): void {
    this.docenteId = Number(this.route.snapshot.paramMap.get('id_docente'));
    this.loaderService.show(); 
    this.docentService.selectedDocenteId$.subscribe(
      (id_docente) => {
        if (id_docente !== null && id_docente !== undefined) {
          this.docenteId = id_docente;
        }
        this.loaderService.hide(); 
      },
      (error) => {
        console.error('Error al obtener el ID del docente:', error);
        this.alertService.showError(error.status, 'Error al cargar datos');
        this.loaderService.hide();
      }
    );
  }
  closeModal() {
    this.modalService.closeModal()
  }

  confirmDelete() {
    if (this.docenteId) {
      this.loaderService.show(); 
      this.docenteService.deleteDocente(this.docenteId).subscribe(
        (response) => {
          console.log('Docente eliminado exitosamente:', response);
          this.alertService.showSuccess('El docente ha sido eliminado correctamente.');
          this.closeModal();
          this.loaderService.hide(); 
        },
        (error) => {
          console.error('Error al eliminar el docente:', error);
          this.alertService.showError(error.status, 'Error al eliminar');
          this.loaderService.hide(); 
        }
      );
    } else {
      this.alertService.showWarning('No se encontró un docente válido para eliminar.', 'Operación no válida');
    }
  }
}