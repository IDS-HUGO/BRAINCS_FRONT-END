import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  
import { TareaService } from '../../../alumno/services/tarea.service';
import { environment } from '../../../../enviroment/enviroment';
import { ActividadService } from '../../../alumno/services/actividad.service';
import { LoaderService } from '../../modals/services/loader.service';
import { AlertService } from '../../modals/services/alert.service';
@Component({
  selector: 'app-card-activity',
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.css']
})
export class CardActivityComponent {
  @Input() activityDetails: any; 
  @Input() userType: string = 'alumno';  
  @Output() close = new EventEmitter<void>();  
  @Output() submitActivity = new EventEmitter<File>(); 

  selectedFile: File | null = null;
  activitySupportFile: string | null = null; 
  activitySupportFileSafe: SafeResourceUrl | null = null;
  isSupportContentOpen = false; 


  constructor(private sanitizer: DomSanitizer,
    private tareaService: TareaService,
    private actividadService: ActividadService,
    public loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  // Cierra el modal
  onCloseModal() {
    this.close.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (!this.selectedFile.name.endsWith('.pdf')) {
        this.alertService.showWarning('Por favor selecciona un archivo PDF.');
        this.selectedFile = null;
      }
    }
  }
  onSubmitActivity(): void {
    if (!this.selectedFile) {
      this.alertService.showWarning('Por favor selecciona un archivo.');
      return;
    }
  
    this.alertService.showConfirmation('Una vez enviada la tarea, no podrás modificarla.')
      .then((result) => {
        if (result.isConfirmed) {
          this.loaderService.show(); 
  
          this.tareaService.createTarea(
            this.activityDetails.id_actividad,  
            this.selectedFile! 
          ).subscribe({
            next: (response) => {
              console.log('Tarea subida exitosamente', response);
              this.alertService.showSuccess('¡Tarea subida con éxito!');
              this.close.emit(); 
              this.loaderService.hide(); 
            },
            error: (error) => {
              console.error('Error al subir la tarea', error);
              this.loaderService.hide(); 
              if (error.error && error.error.detail) {
                this.alertService.showError(error.status, error.error.detail);
              } else {
                this.alertService.showError(error.status, 'Ocurrió un error desconocido al subir la tarea.');
              }
            },
          });
        }
      });
  }
  
  

  isImage(file: string | null): boolean {
    return file ? file.match(/\.(jpeg|jpg|png|gif)$/) !== null : false;
  }

  isPdf(file: string | null): boolean {
    return file ? file.match(/\.pdf$/) !== null : false;
  }

  onContentSupportClick(content: string | null) {
    if (content) {
      if (content.includes('/home/ubuntu/BRAINIACS_API/')) {
        content = content.replace('/home/ubuntu/BRAINIACS_API/', '');
      }
      const fullUrl = `${environment.apiUrl}${content}`;
      this.activitySupportFile = fullUrl;
      this.activitySupportFileSafe = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl); 
      this.isSupportContentOpen = true;
    } else {
      console.error('No hay contenido de apoyo disponible.');
    }
  }
  

  onCloseSupportContent() {
    this.isSupportContentOpen = false;
  }

  loadActivities() {
    this.actividadService.getActivitiesByGroupId().subscribe({
      next: (activities) => {
        console.log('Actividades cargadas:', activities);

      },
      error: (error) => {
        console.error('Error al cargar actividades', error);
      }
    });
  }

  onContentClick() {
    console.log("Contenido clicked - acción específica para docentes");
  }

  onEntregasClick() {
    console.log("Entregas clicked - acción específica para docentes");

}
}
