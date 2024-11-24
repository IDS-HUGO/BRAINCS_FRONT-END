import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TareaService } from '../../../alumno/services/tarea.service';
import { Tarea } from '../../../alumno/models/tarea';
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
  isSupportContentOpen = false; 

  constructor(private tareaService: TareaService) {}

  onCloseModal() {
    this.close.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmitActivity(): void {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo.');
      return;
    }

    const tarea: Tarea = {
      id_actividad: this.activityDetails.id_actividad,
      id_alumno: this.activityDetails.id_alumno,
      tarea: this.activityDetails.subtema
    };

    this.tareaService.subirTarea(tarea, this.selectedFile).subscribe(
      response => {
        console.log('Tarea subida exitosamente', response);
        alert('¡Tarea subida con éxito!');
      },
      error => {
        console.error('Error al subir la tarea', error);
        alert('Ocurrió un error al subir la tarea.');
      }
    );
  }


  onContentSupportClick(content: string | null) {
    if (content) {
      this.activitySupportFile = content;
      this.isSupportContentOpen = true;
    } else {
      console.error('No hay contenido de apoyo disponible.');
    }
  }

  onCloseSupportContent() {
    this.isSupportContentOpen = false;
    this.activitySupportFile = null;
  }

  isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  onContentClick() {
    console.log("Contenido clicked - acción específica para docentes");
  }

  onEntregasClick() {
    console.log("Entregas clicked - acción específica para docentes");
  }
}
