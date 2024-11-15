import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-view-activity',
  templateUrl: './modal-view-activity.component.html',
  styleUrl: './modal-view-activity.component.css'
})
export class ModalViewActivityComponent {
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
      this.submitActivity.emit(this.selectedFile);
    } else {
      alert('Por favor selecciona un archivo antes de subirlo.');
    }
  }
}
