import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private selectedActivitySource = new BehaviorSubject<any>(null);
  selectedActivity$ = this.selectedActivitySource.asObservable();

  private selectedActivityIdSource = new BehaviorSubject<any>(null);
  selectedActivityId$ = this.selectedActivityIdSource.asObservable();

  setSelectedActivity(activity: any) {
    this.selectedActivitySource.next(activity);
  }

  setSelectedActivityId(id: number) {
    this.selectedActivityIdSource.next(id);
  }

  clearSelectedActivity() {
    this.selectedActivitySource.next(null);
    this.selectedActivityIdSource.next(null);
  }
}