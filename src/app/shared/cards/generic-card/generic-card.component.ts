import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent implements OnInit {
  @Input() cardData: any;
  @Input() cardType: 'activity' | 'temario' | 'alumno' = 'activity';
  @Output() openModal = new EventEmitter<any>();
  userType: string = '';

  ngOnInit(): void {

    const storedRole = localStorage.getItem('role');
    this.userType = storedRole ? storedRole : 'invitado';
    console.log('Rol del usuario:', this.userType);
  }

  onCardClick(): void {
    if (this.cardType === 'activity' || this.cardType === 'temario') {
      this.openModal.emit(this.cardData);
    }
  }
}