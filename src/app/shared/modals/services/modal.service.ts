import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  private modalTypeSubject = new BehaviorSubject<string>('');

  private modalState = new BehaviorSubject<{ isOpen: boolean; data?: any }>({ isOpen: false });
  modalState$ = this.modalState.asObservable();

  modalOpen$ = this.modalOpenSubject.asObservable();
  modalType$ = this.modalTypeSubject.asObservable();

  private groupIdSubject = new BehaviorSubject<number | null>(null);
  groupId$ = this.groupIdSubject.asObservable(); 

  openDeleteModal(groupId: number) {
    this.modalTypeSubject.next('deleteGroup');
    this.groupIdSubject.next(groupId);
    this.modalOpenSubject.next(true);
  }
  
  openUpdateModal(groupId: number) {
    this.modalTypeSubject.next('editGroup');
    this.groupIdSubject.next(groupId);
    this.modalOpenSubject.next(true);
  }

  openModal(type: string) {
    this.modalTypeSubject.next(type);
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
    this.modalTypeSubject.next('');
  }
}
