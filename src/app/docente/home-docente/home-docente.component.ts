import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupServiceService } from '../services/group-service.service';
import { ModalService } from '../../shared/modals/services/modal.service';
import { GroupData } from '../models/group-data';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css']
})
export class HomeDocenteComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  groups: GroupData[] = [];
  private modalSubscription: Subscription | undefined;
  private groupAddedSubscription: Subscription | undefined;
  private groupUpdatedSubscription: Subscription | undefined;

  id_docente: number = Number(localStorage.getItem('id_docente'));

  constructor(
    private modalService: ModalService,
    private groupService: GroupServiceService
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    this.loadGroups();

    this.groupAddedSubscription = this.groupService.groupAdded$.subscribe(() => {
      this.loadGroups();
    });
  
    this.groupUpdatedSubscription = this.groupService.groupUpdated$.subscribe(() => {
      this.loadGroups();
    });
  }

  loadGroups() {
    if (this.id_docente) {
      this.groupService.getGroups(this.id_docente).subscribe({
        next: (response) => {
          this.groups = response;
          console.log('Grupos cargados:', this.groups);
        },
        error: (error) => {
          console.error('Error al obtener los grupos:', error);
        }
      });
    } else {
      console.error('id_docente no encontrado en localStorage');
    }
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.groupAddedSubscription) {
      this.groupAddedSubscription.unsubscribe();
    }
  }
}