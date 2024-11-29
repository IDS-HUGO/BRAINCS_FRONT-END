import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ModalServiceProfile } from '../Service/ModalProfile.service';
import { ModalService } from '../../modals/services/modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() role: string | null = null;
  @Output() addGroup = new EventEmitter<void>();
  @Output() openProfileModalEvent = new EventEmitter<void>(); 
  @Output() openAddDocenteModalEvent = new EventEmitter<void>(); 

  isClicked = false;

  constructor(
    private router: Router,
    private modalServiceProfile: ModalServiceProfile,
    private modalService : ModalService

  ) {}

  backToHome(): void {
    this.router.navigate(['/home']);
  }

  onAddGroup() {
    this.addGroup.emit();
    this.modalService.openModal('group');
  }

  onAddDocente() {
    this.openAddDocenteModalEvent.emit()
    this.modalService.openModal('docente'); 
  }

  onProfileModal(): void {
    this.modalServiceProfile.openModal('profile'); 
  }
  
}
