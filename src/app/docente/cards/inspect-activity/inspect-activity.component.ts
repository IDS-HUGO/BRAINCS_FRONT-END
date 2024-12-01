import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from '../../../shared/cards/services/activity.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../shared/modals/services/modal.service';

@Component({
  selector: 'app-inspect-activity',
  templateUrl: './inspect-activity.component.html',
  styleUrls: ['./inspect-activity.component.css'],
})
export class InspectActivityComponent implements OnInit, OnDestroy {
  selectedActivity: any = null;
  private subscription: Subscription | undefined;

  constructor(
    private activityService: ActivityService,
    private modalService : ModalService
  ) {}

  ngOnInit() {
    this.subscription = this.activityService.selectedActivity$.subscribe(
      (activity) => {
        this.selectedActivity = activity;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openPdf(pdfUrl: string | undefined): void {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.log('PDF URL no disponible');
    }
  }

  closeModal(){
    this.modalService.closeModal()
  }
}
