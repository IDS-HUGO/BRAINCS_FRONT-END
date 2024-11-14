import { Component } from '@angular/core';

@Component({
  selector: 'app-card-activity',
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.css']
})
export class CardActivityComponent {
  isModalVisible: boolean = false;  
  selectedActivity: { name: string, description: string, dueDate?: Date } | null = null;

  activity = {
    name: 'Hola Mundo',
    description: 'Crear un programa que imprima el mensaje de Hola Mundo en Java',
    dueDate: new Date('2024-10-30')
  };

  openModal(activity: { name: string, description: string, dueDate?: Date }) {
    this.selectedActivity = activity;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  handleSubmitActivity(file: File) {
    console.log('Archivo recibido:', file);
    this.closeModal();
  }
}