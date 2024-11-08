import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent {
  @Input() subjectName: string = 'Matematicas I';
  showModal: boolean = false;

  constructor(private router: Router) {}

  toggleModal() {
    this.showModal = !this.showModal;
    console.log('showModal:', this.showModal);
  }

  handleOption(option: string) {
    if (option === 'inspect') {
      console.log('Inspeccionar opción seleccionada');
      this.router.navigate(['/docente/view-group']);
    }
  }
}