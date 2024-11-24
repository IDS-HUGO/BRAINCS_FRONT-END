import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent {

  constructor(private modalService: ModalService) {}

  @Output() addTarea = new EventEmitter<void>();

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

  onAddTarea() {
    this.modalService.openModal('tarea');
  }
}