import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalSubject = new Subject<boolean>();
  modalOpen$: any;

  getModalState() {
    return this.modalSubject.asObservable();
  }

  openModal() {
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }
}
