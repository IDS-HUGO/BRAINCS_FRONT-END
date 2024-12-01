import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TemarioService } from '../../services/temario.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../shared/modals/services/loader.service';  // Importando LoaderService
import { AlertService } from '../../../shared/modals/services/alert.service';    // Importando AlertService

@Component({
  selector: 'app-add-temario',
  templateUrl: './add-temario.component.html',
  styleUrls: ['./add-temario.component.css']
})
export class AddTemarioComponent {
  archivo: File | null = null;
  groupId: number = 0;

  constructor(
    private modalService: ModalService,
    private temarioService: TemarioService,
    private route: ActivatedRoute,
    public loaderService: LoaderService,
    private alertService: AlertService    
  ) {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.archivo = file;
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onUploadTemario(): void {
    if (!this.archivo) {
      this.alertService.showWarning('No se ha seleccionado un archivo para subir.');
      return;
    }
    
    console.log('Archivo seleccionado:', this.archivo);

    this.loaderService.show();  
    this.temarioService.addTemarioWithFile(this.archivo, this.groupId).subscribe(
      (response) => {
        this.loaderService.hide();  
       this.alertService.showSuccess('Temario subido con éxito');
        this.closeModal();
      },
      (error) => {
        this.loaderService.hide();
        this.alertService.showError(error.status);
        console.error('Error al subir el temario:', error);
      }
    );
  }  
}
