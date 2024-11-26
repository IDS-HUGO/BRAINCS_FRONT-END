import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent {
  @Input() cardData: any;
  @Input() cardType?: 'activity' | 'temario' | 'alumno' ;
  @Output() openModal = new EventEmitter<any>();
  @Input() userType: string = localStorage.getItem('role') || '';
  
  onCardClick() {
    if (this.cardType === 'activity' || this.cardType === 'temario') {
      this.openModal.emit(this.cardData);
    } else {
      console.warn('El tipo de tarjeta no es válido o no fue proporcionado.');
    }
  }
  
}