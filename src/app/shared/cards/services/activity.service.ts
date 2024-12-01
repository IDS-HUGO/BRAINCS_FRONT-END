import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private selectedActivitySource = new BehaviorSubject<any>(null);
  selectedActivity$ = this.selectedActivitySource.asObservable();

  setSelectedActivity(activity: any) {
    this.selectedActivitySource.next(activity);
  }

  clearSelectedActivity() {
    this.selectedActivitySource.next(null);
  }
}