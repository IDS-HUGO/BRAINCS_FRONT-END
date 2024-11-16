import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent {
  @Input() cardData: any;
  @Input() cardType: 'activity' | 'temario' | 'alumno' | undefined;
}