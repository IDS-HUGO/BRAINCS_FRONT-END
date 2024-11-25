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

  openModal(type: string, data: any = null) {
    this.modalTypeSubject.next(type);
    this.groupIdSubject.next(data);
    this.modalOpenSubject.next(true);
  }  

  openDeleteModal(groupId: number) {
    this.modalTypeSubject.next('delete');
    this.groupIdSubject.next(groupId);
    this.modalOpenSubject.next(true);
  }
<<<<<<< HEAD

  openDeleteModal() {
    this.modalTypeSubject.next('delete');
=======
  
  openUpdateModal(groupId: number) {
    this.modalTypeSubject.next('edit');
    this.groupIdSubject.next(groupId);
>>>>>>> 2bb548b0e40f1e554d1b36a32a1c0861af51de94
    this.modalOpenSubject.next(true);
  }  

  closeModal() {
    this.modalOpenSubject.next(false);
    this.groupIdSubject.next(null);
  }
}
