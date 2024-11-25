// home-director.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-director',
  templateUrl: './home-director.component.html',
  styleUrls: ['./home-director.component.css']
})
export class HomeDirectorComponent {

  showAddDocenteModal: boolean = false;
  showViewUsuarioModal: boolean = false;
  selectedUserId: number | null = null;

  openAddDocenteModal() {
    this.showAddDocenteModal = true;
  }

  closeAddDocenteModal() {
    this.showAddDocenteModal = false;
  }

  openViewUsuarioModal() {
    this.selectedUserId = 1; 
    this.showViewUsuarioModal = true;
  }

  closeViewUsuarioModal() {
    this.showViewUsuarioModal = false;
    this.selectedUserId = null;
  }
}
