import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { TareaService } from '../../services/tarea.service';
import { ActivitiesService } from '../../services/activities.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';  // Importando el AlertService

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
  isLoading: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private modalService: ModalService,
    private tareaService: TareaService,
    private activitiesService: ActivitiesService,
    public loaderService: LoaderService,
    private alertService: AlertService  
  ) {}

  ngOnInit() {
    const data = this.tareaService.getTemaSubtema();
    this.tema = data.tema;
    this.subtema = data.subtema;
    this.groupId = data.groupId;
  }

  onUploadTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedUploadType = target.value;
  }

  onAddContenido() {
    if (this.selectedUploadType === 'file') {
      const file = this.fileInput.nativeElement.files[0];

      if (file) {
        this.loaderService.show(); 
        this.activitiesService.createActivity(this.groupId, this.tema, this.subtema, file)
          .subscribe({
            next: (response) => {
              this.loaderService.hide(); 
              this.modalService.closeModal();
            },
            error: (error) => {
              this.loaderService.hide();
              this.alertService.showError(error.status);  
              console.error('Error al crear la actividad:', error);
            }
          });
      } else {
        this.alertService.showWarning('Por favor selecciona un archivo antes de continuar.');  
      }
    } 
  }

  onAddContenidoIA() {
    this.modalService.openModal('contenidoIA');
  }

  closeModal() {
    this.modalService.openModal('tarea');
  }
}
