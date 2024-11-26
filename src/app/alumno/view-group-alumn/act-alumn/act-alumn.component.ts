import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../services/actividad.service';
import { Actividad } from '../../models/actividad';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
@Component({
  selector: 'app-act-alumn',
  templateUrl: './act-alumn.component.html',
  styleUrls: ['./act-alumn.component.css'],
})
export class ActAlumnComponent implements OnInit {
  selectedActivity: Actividad | null = null; // Actividad seleccionada para el modal
  isModalOpen = false;
  activities: Actividad[] = []; // Lista de actividades

  constructor(
    private actividadService: ActividadService,
    private tareaService: TareaService
  ) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.actividadService.getActivitiesByGroupId().subscribe({
      
      next: (response) => {
        this.activities = response;
        console.log('Actividades cargadas:', this.activities);
      },
      error: (error) => {
        console.error('Error al obtener las actividades:', error.message);
      },
    });
  }

  openActivityModal(activity: Actividad) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  closeActivityModal() {
    this.isModalOpen = false;
  }

}
