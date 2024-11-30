import { Component } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TemarioService } from '../../services/temario.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
      console.error('No se ha seleccionado un archivo.');
      return;
    }
    
    console.log('Archivo seleccionado:', this.archivo);
    this.temarioService.addTemarioWithFile(this.archivo, this.groupId).subscribe(
      (response) => {
        console.log('Temario subido con éxito:', response);
        this.closeModal();
      },
      (error) => {
        console.error('Error al subir el temario:', error);
      }
    );
  }  
}