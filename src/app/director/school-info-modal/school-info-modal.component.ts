import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-school-info-modal',
  templateUrl: './school-info-modal.component.html',
})
export class SchoolInfoModalComponent {
  @Input() isVisible = false; // Controla la visibilidad del modal
  @Output() closeModalEvent = new EventEmitter<void>(); // Emite evento para cerrar el modal

  schoolInfo = {
    pregunta: '',
    respuesta: '',
    pdf: null as File | null,
  };

  constructor(private http: HttpClient) {}

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

    this.http.post('https://apibrainiacs.brainiacs.site/chatbot/', formData).subscribe({
      next: (response) => {
        alert('Información subida correctamente');
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al subir la información', err);
        alert('Error al subir la información');
      },
    });
  }
}
