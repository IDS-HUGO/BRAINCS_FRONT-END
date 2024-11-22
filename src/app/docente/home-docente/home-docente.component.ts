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

  constructor(
    private modalService: ModalService,
    private groupService: GroupServiceService
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });

    this.groupService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
        console.log('Grupos cargados:', this.groups);
      },
      error: (error) => {
        console.error('Error al obtener los grupos:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}