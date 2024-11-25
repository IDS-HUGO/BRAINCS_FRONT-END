import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-activity',
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.css']
})
export class CardActivityComponent {
  @Input() activityDetails: any;
  @Output() close = new EventEmitter<void>();

  onCloseModal() {
    this.close.emit();
  }

  openContent(contentUrl: string) {
    window.open(contentUrl, '_blank');
  }
}