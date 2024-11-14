import { Component } from '@angular/core';

@Component({
  selector: 'app-card-act',
  templateUrl: './card-act.component.html',
  styleUrl: './card-act.component.css'
})
export class CardActComponent {
  isModalVisible: boolean = false;  
  selectedActivity: { name: string, description: string } | null = null;

  openModal(activity: { name: string, description: string }) {
    this.selectedActivity = activity;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  isModalOpen = false;
  activity = {
    name: 'Hola Mundo',
    description: 'Crear un programa que imprima el mensaje de Hola Mundo en Java',
    dueDate: new Date('2024-10-30')
  };

  handleSubmitActivity(file: File) {
    console.log('Archivo recibido:', file);
    this.closeModal();
  }

}
