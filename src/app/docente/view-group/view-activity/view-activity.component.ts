import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private activitiesService: ActivitiesService,
    private cdr : ChangeDetectorRef
  ) {}

  @Output() addTarea = new EventEmitter<void>();
  @Output() deleteTarea = new EventEmitter<void>();

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadActivities();
  
    this.activitiesService.onActivityCreated().subscribe(() => {
      this.loadActivities();
    });
  }

  loadActivities() {
    if (this.groupId) {
      this.activitiesService.getActivitiesByGroup(this.groupId).subscribe({
        next: (data) => {
          this.activities = data.map((activity: any) => ({
            ...activity,
            contenido: activity.contenido.startsWith('/home/ubuntu/BRAINIACS_API')
              ? activity.contenido.replace(
                  '/home/ubuntu/BRAINIACS_API',
                  'https://apibrainiacs.brainiacs.site'
                )
              : activity.contenido
          }));
          console.log("Actividades cargadas con URL actualizada:", this.activities);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar actividades:', error);
          this.activities = []; // Asegurar que las actividades sean un array vacío en caso de error
        }
      });
    } else {
      console.error('groupId no encontrado o no válido');
      this.activities = []; // Array vacío si groupId no está definido
    }
  }
   

  openActivityModal(activity: any) {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  closeActivityModal() {
    this.isModalOpen = false;
  }

  onAddTarea() {
    this.addTarea.emit();
    this.modalService.openModal('tarea');
  }
}