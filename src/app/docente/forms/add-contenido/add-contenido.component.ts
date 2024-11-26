import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TareaService } from '../../services/tarea.service';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-add-contenido',
  templateUrl: './add-contenido.component.html',
  styleUrls: ['./add-contenido.component.css']
})
export class AddContenidoComponent implements OnInit {
  selectedUploadType: string = 'file';
  groupId: number = 0;
  tema: string = '';
  subtema: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private modalService: ModalService,
    private tareaService: TareaService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    const data = this.tareaService.getTemaSubtema();
    this.tema = data.tema;
    this.subtema = data.subtema;
    this.groupId = data.groupId;

    console.log('Tema y subtema recibidos y también el grupo:', this.tema, this.subtema, this.groupId);
  }

  onUploadTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedUploadType = target.value;
  }

  onAddContenido() {
    if (this.selectedUploadType === 'file') {
      const file = this.fileInput.nativeElement.files[0];

      if (file) {
        this.activitiesService.createActivity(this.groupId, this.tema, this.subtema, file)
          .subscribe({
            next: (response) => {
              console.log('Actividad creada con éxito:', response);
              this.modalService.closeModal();
            },
            error: (error) => {
              console.error('Error al crear la actividad:', error);
            }
          });
      } else {
        console.error('Debe seleccionar un archivo.');
      }
    } else {
      console.log('Agregar contenido desde un enlace');
    }
  }

  onAddContenidoIA(){
    this.modalService.openModal('contenidoIA')
  }

  closeModal() {
    this.modalService.openModal('tarea');
  }
}
