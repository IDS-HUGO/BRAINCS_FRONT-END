import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../../shared/modals/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  activities: any[] = [];
  selectedActivity: any = null;
  isModalOpen = false;
  groupId!: number;

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService
  ) {}

  @Output() addTarea = new EventEmitter<void>();

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadActivities();
  }

  loadActivities() {
    this.activitiesService.getActivitiesByGroup(this.groupId).subscribe(
      (data) => {
        this.activities = data.map((activity: any) => ({
          ...activity,
          contenido: activity.contenido.includes('localhost')
            ? activity.contenido.replace(
                'http://localhost:4200/home/ubuntu/BRAINIACS_API',
                'https://apibrainiacs.brainiacs.site'
              )
            : activity.contenido
        }));
      },
      (error) => {
        console.error('Error loading activities:', error);
      }
    );
  }

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