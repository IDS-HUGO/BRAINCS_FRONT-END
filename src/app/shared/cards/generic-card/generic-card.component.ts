import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.css']
})
export class GenericCardComponent implements OnInit {
  @Input() cardData: any;
  @Input() cardType?: 'activity' | 'temario' | 'alumno' ;
  @Output() openModal = new EventEmitter<any>();
  userType: string = '';
  showMenu: string | null = null;

  ngOnInit(): void {
    const storedRole = localStorage.getItem('role');
    this.userType = storedRole ? storedRole : 'invitado';
    console.log('Rol del usuario:', this.userType);
  }

  onCardClick(): void {
    if (this.cardType === 'activity' || this.cardType === 'temario') {
      this.openModal.emit(this.cardData);
    } else {
      console.warn('El tipo de tarjeta no es válido o no fue proporcionado.');
    }
  }

  toggleMenu(cardType: string): void {
    this.showMenu = this.showMenu === cardType ? null : cardType;
  }

  closeMenu(): void {
    this.showMenu = null;
  }

  handleOption(option: string, cardType: string): void {
    console.log(`Opción seleccionada en ${cardType}:`, option);
    this.closeMenu();
  }
}