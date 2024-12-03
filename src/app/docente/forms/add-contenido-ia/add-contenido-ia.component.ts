import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { PdfService } from '../../services/pdf.service';
import { ActivitiesService } from '../../services/activities.service';
import { TareaService } from '../../services/tarea.service';

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

  groupId: number = 0;
  tema: string = '';
  subtema: string = '';

  constructor(
    private modalService: ModalService,
    private pdfService: PdfService,
    private activitiesService : ActivitiesService,
    private tareaService : TareaService
  ) {
    this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  ngOnInit() {
    const data = this.tareaService.getTemaSubtema();
    this.tema = data.tema;
    this.subtema = data.subtema;
    this.groupId = data.groupId;
  }

  closeModal() {
    this.modalService.openModal('contenido')
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
  
      console.log('Datos enviados al servicio:', {
        groupId: this.groupId,
        tema: this.tema,
        subtema: this.subtema
      });
  
      this.activitiesService.createActivity(this.groupId, this.tema, this.subtema, pdfBlob).subscribe({
        next: () => {
          this.closeModal();
          this.activitiesService.notifyActivityCreated();
        },
        error: (error) => {
          console.error('Error al enviar PDF:', error);
        }
      });
  
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  }
  

  openContentModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }
}