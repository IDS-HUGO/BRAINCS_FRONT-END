import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityService } from '../../../shared/cards/services/activity.service';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { LoaderService } from '../../../shared/modals/services/loader.service';
import { AlertService } from '../../../shared/modals/services/alert.service';  // Importando AlertService

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html',
  styleUrls: ['./delete-activity.component.css']
})
export class DeleteActivityComponent implements OnInit {
  groupId: number = 0;
  idActividad: number | null = null;
  activityId: number = 0;

  constructor(
    private activitiesService: ActivitiesService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    public loaderService: LoaderService,  // Inyectando LoaderService
    private alertService: AlertService  // Inyectando AlertService
  ) {}

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.selectedActivityId$.subscribe(id => {
      if (id !== null && id !== undefined) {
        this.activityId = id;
      }
    });

    console.log(this.groupId, this.activityId);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  confirmDelete() {
    if (this.groupId && this.activityId) {
      this.loaderService.show(); 
      this.activitiesService.deleteActivity(this.groupId, this.activityId).subscribe(
        response => {
          this.loaderService.hide(); 
          this.alertService.showSuccess('La actividad se eliminó correctamente.');

          this.closeModal(); 
        },
        error => {
          this.loaderService.hide(); 
          this.alertService.showError(error.status);

          console.error('Error al eliminar la actividad:', error);
        }
      );
    } else {
      this.alertService.showWarning('Faltan datos para eliminar la actividad.');
    }
  }  
}
