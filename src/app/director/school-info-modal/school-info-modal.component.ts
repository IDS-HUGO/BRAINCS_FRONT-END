import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../shared/modals/services/loader.service';
import { AlertService } from '../../shared/modals/services/alert.service';

@Component({
  selector: 'app-school-info-modal',
  templateUrl: './school-info-modal.component.html',
})
export class SchoolInfoModalComponent {
  @Input() isVisible = false; 
  @Output() closeModalEvent = new EventEmitter<void>(); 

  schoolInfo = {
    pregunta: '',
    respuesta: '',
    pdf: null as File | null,
  };

  constructor(
    private http: HttpClient,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.schoolInfo.pdf = target.files[0];
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.isVisible = false;
  }

  submitSchoolInfo(): void {
    const formData = new FormData();
    formData.append('pregunta', this.schoolInfo.pregunta);
    formData.append('respuesta', this.schoolInfo.respuesta);
    if (this.schoolInfo.pdf) {
      formData.append('pdf', this.schoolInfo.pdf);
    }

    this.loaderService.show();

    this.http.post('https://apibrainiacs.brainiacs.site/chatbot/', formData).subscribe({
      next: () => {
        this.alertService.showSuccess('Información subida correctamente');
        this.closeModal();
      },
      error: (err) => {
        const status = err.status || 500;
        this.alertService.showError(status, 'Error al subir la información');
      },
      complete: () => {
        this.loaderService.hide();
      },
    });
  }
}
