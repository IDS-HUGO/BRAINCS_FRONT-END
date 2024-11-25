import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private showAlert = new BehaviorSubject<boolean>(false);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  setAlertVisibility(visible: boolean): void {
    this.showAlert.next(visible);
  }

  shouldShowAlert(): BehaviorSubject<boolean> {
    return this.showAlert;
  }
}
