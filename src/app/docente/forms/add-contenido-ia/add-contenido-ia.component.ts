import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { PdfService } from '../../services/pdf.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-contenido-ia',
  templateUrl: './add-contenido-ia.component.html',
  styleUrls: ['./add-contenido-ia.component.css']
})

export class AddContenidoIAComponent {
  modalOpen: boolean = false;

  @Output() addTarea = new EventEmitter<void>();

  selectedActivity: any = null;
  isModalOpen = false;

  promptInput: string = '';
  generatedContent: string = '';

  constructor(
    private modalService: ModalService,
    private pdfService: PdfService
  ) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  closeModal() {
    this.modalService.openModal('tarea')
  }

  async generateContent() {
    try {
      this.generatedContent = '';
      const content = await this.pdfService.generateContent(this.promptInput);
  
      let index = 0;
      const interval = setInterval(() => {

        this.generatedContent += content[index];
        index++;
  
        if (index === content.length) {
          clearInterval(interval);
        }
      }, 20);
  
    } catch (error) {
      console.error('Error generando contenido:', error);
      if (error instanceof HttpErrorResponse && error.status === 401) {
        alert('No autorizado. Verifique su API Key.');
      } else {
        alert('Error al generar contenido.');
      }
    }
  }
  
  generatePdf() {
    try {
      if (!this.generatedContent) {
        alert('Primero debe generar contenido antes de crear el PDF.');
        return;
      }
      const { pdfBlob, pdfUrl } = this.pdfService.generatePdf(this.generatedContent);
      window.open(pdfUrl);
      alert('PDF generado exitosamente.');
      this.closeModal();
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF.');
    }
  }

  openContentModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }
}