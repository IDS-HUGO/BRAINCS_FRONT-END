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

  private groupIdSubject = new BehaviorSubject<number | null>(null);
  groupId$ = this.groupIdSubject.asObservable();

  openModal(type: string) {
    this.modalTypeSubject.next(type);
    this.modalOpenSubject.next(true);
  }

  openDeleteModal(groupId: number) {
    this.modalTypeSubject.next('delete');
    this.groupIdSubject.next(groupId);
    this.modalOpenSubject.next(true);
  }  

  closeModal() {
    this.modalOpenSubject.next(false);
    this.groupIdSubject.next(null);
  }
}
