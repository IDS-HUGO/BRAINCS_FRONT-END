import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ModalService } from '../Service/Modal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() role: string | null = null;
  @Output() addGroup = new EventEmitter<void>();
  @Output() openProfileModalEvent = new EventEmitter<void>(); 

  isClicked = false;

  constructor(private modalService: ModalService) {}

  onAddGroup() {
    this.addGroup.emit();
    this.modalService.openModal('group');
  }

  onProfileModal(): void {
    this.modalService.openModal('profile'); 
  }
  
}
