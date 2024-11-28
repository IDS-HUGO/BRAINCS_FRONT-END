import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceProfile {
  private modals: { [key: string]: boolean } = {};

  openModal(id: string): void {
    console.log(`Opening modal with id: ${id}`); 
    this.modals[id] = true;
  }
  
  
  closeModal(id: string): void {
    console.log(`Closing modal: ${id}`);
    this.modals[id] = false;
  }
  

  isModalOpen(id: string): boolean {
    return !!this.modals[id];
  }
}
