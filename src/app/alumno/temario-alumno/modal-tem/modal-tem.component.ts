import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-tem',
  templateUrl: './modal-tem.component.html',
  styleUrl: './modal-tem.component.css'
})
export class ModalTemComponent {
  @Input() activityDetails: any;
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
      this.submitActivity.emit(this.selectedFile); // Envía el archivo al componente padre
    } else {
      alert('Por favor selecciona un archivo antes de subirlo.');
    }
  }

}
