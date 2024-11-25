// header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openAddDocenteModalEvent = new EventEmitter<void>(); 
  @Output() openProfileModalEvent = new EventEmitter<void>(); 

  onAddDocente() {
    this.openAddDocenteModalEvent.emit(); 
  }

  onProfile(){
    this.openProfileModalEvent.emit();
  }
}
