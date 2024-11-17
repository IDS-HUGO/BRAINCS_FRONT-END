import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../shared/modals/services/modal.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css']
})
export class HomeDocenteComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  private modalSubscription: Subscription | undefined;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modalOpen$.subscribe(isOpen => {
      this.modalOpen = isOpen;
    });
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

}