import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { ActivityService } from '../../../shared/cards/services/activity.service';
import { ActivitiesService } from '../../services/activities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {
  groupId: number = 0;
  idActividad: number | null = null;
  tema: string = '';
  subtema: string = '';
  contenido: File | null = null;

  constructor(
    private modalService: ModalService,
    private activitiesService: ActivitiesService,
    private activityService: ActivityService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    this.activityService.selectedActivityId$.subscribe(id => {
      if (id) {
        this.idActividad = id;
        this.loadActivityData();
      }
    });
  }

  loadActivityData() {
    if (this.idActividad) {
      this.activitiesService.getActivityById(this.idActividad).subscribe(activity => {
        if (activity) {
          this.tema = activity.tema;
          this.subtema = activity.subtema;
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.contenido = file;
    }
  }

  handleSubmit() {
    if (this.tema && this.subtema && this.contenido && this.idActividad !== null) {
      this.activitiesService.updateActivity(this.groupId, this.idActividad, this.tema, this.subtema, this.contenido).subscribe(
        response => {
          console.log('Actividad actualizada exitosamente:', response);
          this.closeModal();
        },
        error => {
          console.error('Error al actualizar la actividad:', error);
        }
      );
    } else {
      console.log('Faltan campos para completar');
    }
  }
  

  closeModal() {
    this.modalService.closeModal();
    this.activityService.clearSelectedActivity()
  }
}
