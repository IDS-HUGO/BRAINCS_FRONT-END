import { Component } from '@angular/core';

@Component({
  selector: 'app-act-alumn',
  templateUrl: './act-alumn.component.html',
  styleUrl: './act-alumn.component.css'
})
export class ActAlumnComponent {

  activities = [
    { title: 'Primer parcial', description: 'Hola mundo', dueDate: '2024-11-16' },
    { title: 'Segundo parcial', description: 'Otra actividad', dueDate: '2024-11-17' },
  ];

  selectedActivity: any = null;
  isModalOpen = false;

  openActivityModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  closeActivityModal() {
    this.isModalOpen = false;
  }

}
