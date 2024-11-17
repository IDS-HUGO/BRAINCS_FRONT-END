import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  onCloseModal() {
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmitActivity() {
    if (this.selectedFile) {
      this.submitActivity.emit(this.selectedFile);
    } else {
      alert('Por favor selecciona un archivo antes de subirlo.');
    }
  }

  onContentClick() {
    console.log("Contenido clicked - acción específica para docentes");
  }

  onEntregasClick() {
    console.log("Entregas clicked - acción específica para docentes");
  }
}