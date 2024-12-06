import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TemarioService } from '../../../alumno/services/temario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../enviroment/enviroment';

@Component({
  selector: 'app-card-temario',
  templateUrl: './card-temario.component.html',
  styleUrl: './card-temario.component.css'
})
export class CardTemarioComponent {
  @Input() temarioDetails: any; 
  @Input() userType: string = 'alumno';  
  @Output() close = new EventEmitter<void>();  
  @Output() submitTemario = new EventEmitter<File>(); 

  temarioSupportFile: string | null = null; 
  temarioSupportFileSafe: SafeResourceUrl | null = null;
  isSupportTemarioOpen = false; 

  
  constructor(private sanitizer: DomSanitizer,
    private temarioService: TemarioService,
  ) {}

  onCloseModal() {
    this.close.emit();
  }

  isImage(file: string | null): boolean {
    return file ? file.match(/\.(jpeg|jpg|png|gif)$/) !== null : false;
  }

  isPdf(file: string | null): boolean {
    return file ? file.match(/\.pdf$/) !== null : false;
  }

  onTemarioSupportClick(content: string | null) {
    if (content) {
      if (content.includes('/temario/grupo/')) {
        content = content.replace('/temario/grupo/', '');
      }
      const fullUrl = content.startsWith('http') ? content : `${environment.apiUrl}${content}`;
  
       window.open(fullUrl, '_blank');
    } else {
      console.error('No hay contenido de apoyo disponible.');
    }
  }
  
  

  onCloseSupportContent() {
    this.isSupportTemarioOpen = false;
  }

}
