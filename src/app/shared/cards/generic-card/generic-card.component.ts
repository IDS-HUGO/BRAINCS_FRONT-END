import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent {
  @Input() cardData: any;
  @Input() cardType: 'activity' | 'temario' | 'alumno' = 'activity';
  @Output() openModal = new EventEmitter<any>();

  onCardClick() {
    if (this.cardType === 'activity' || this.cardType === 'temario') {
      this.openModal.emit(this.cardData);
    }
  }
}