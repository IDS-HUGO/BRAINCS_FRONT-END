import { Component } from '@angular/core';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent {

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