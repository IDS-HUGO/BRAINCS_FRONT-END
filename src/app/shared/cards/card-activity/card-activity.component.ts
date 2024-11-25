import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importa DomSanitizer
import { TareaService } from '../../../alumno/services/tarea.service';
import { environment } from '../../../../enviroment/enviroment';
import { ActividadService } from '../../../alumno/services/actividad.service';
@Component({
  selector: 'app-card-activity',
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.css']
})
export class CardActivityComponent {
  @Input() activityDetails: any;  // Detalles de la actividad
  @Input() userType: string = 'alumno';  // El tipo de usuario, por defecto 'alumno'
  @Output() close = new EventEmitter<void>();  // Emisor para cerrar el modal
  @Output() submitActivity = new EventEmitter<File>();  // Emisor para enviar el archivo

  selectedFile: File | null = null;
  activitySupportFile: string | null = null; 
  activitySupportFileSafe: SafeResourceUrl | null = null; // Para guardar la URL segura
  isSupportContentOpen = false;  // Control para mostrar contenido de apoyo

  constructor(private sanitizer: DomSanitizer,
    private tareaService: TareaService,
    private actividadService: ActividadService
  ) {}

  // Cierra el modal
  onCloseModal() {
    this.close.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Verifica que el archivo sea PDF
      if (!this.selectedFile.name.endsWith('.pdf')) {
        alert('Por favor selecciona un archivo PDF.');
        this.selectedFile = null;
      }
    }
  }

  onSubmitActivity(): void {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo.');
      return;
    }
  
    // Llamar al servicio para subir la tarea
    this.tareaService.createTarea(
      this.activityDetails.id_actividad,  // ID de la actividad
      this.selectedFile  // Archivo seleccionado
    ).subscribe({
      next: (response) => {
        console.log('Tarea subida exitosamente', response);
        alert('¡Tarea subida con éxito!');
        this.close.emit(); // Cerrar modal tras éxito
      },
      error: (error) => {
        console.error('Error al subir la tarea', error);
        if (error.error && error.error.detail) {
          alert(`Error: ${error.error.detail}`);
        } else {
          alert('Ocurrió un error desconocido al subir la tarea.');
        }
      },
    });
  }
  

  isImage(file: string | null): boolean {
    return file ? file.match(/\.(jpeg|jpg|png|gif)$/) !== null : false;
  }

  // Verifica si el archivo es un PDF
  isPdf(file: string | null): boolean {
    return file ? file.match(/\.pdf$/) !== null : false;
  }

  onContentSupportClick(content: string | null) {
    if (content) {
      // Si el contenido incluye una ruta local indeseada, corrígela
      if (content.includes('/home/ubuntu/BRAINIACS_API/')) {
        content = content.replace('/home/ubuntu/BRAINIACS_API/', '');
      }
      const fullUrl = `${environment.apiUrl}${content}`;
      this.activitySupportFile = fullUrl;
      this.activitySupportFileSafe = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl); // Marca la URL como segura
      this.isSupportContentOpen = true;
    } else {
      console.error('No hay contenido de apoyo disponible.');
    }
  }
  

  // Cerrar contenido de apoyo
  onCloseSupportContent() {
    this.isSupportContentOpen = false;
  }

  // Llamada para cargar las actividades
  loadActivities() {
    this.actividadService.getActivitiesByGroupId().subscribe({
      next: (activities) => {
        console.log('Actividades cargadas:', activities);
        // Asignar actividades a la vista
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
