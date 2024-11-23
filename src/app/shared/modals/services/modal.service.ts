import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  private modalTypeSubject = new BehaviorSubject<string>('');
  modalType$ = this.modalTypeSubject.asObservable();

  openModal(type: string) {
    this.modalTypeSubject.next(type);
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }
}