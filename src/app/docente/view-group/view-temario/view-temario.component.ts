import { Component } from '@angular/core';

@Component({
  selector: 'app-view-temario',
  templateUrl: './view-temario.component.html',
  styleUrls: ['./view-temario.component.css']
})
export class ViewTemarioComponent {
  temarios = [
    { parcial: '1' },
    { parcial: '2' },
  ];
}