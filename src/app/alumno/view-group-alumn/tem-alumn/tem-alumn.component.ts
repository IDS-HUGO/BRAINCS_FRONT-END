import { Component } from '@angular/core';

@Component({
  selector: 'app-tem-alumn',
  templateUrl: './tem-alumn.component.html',
  styleUrl: './tem-alumn.component.css'
})
export class TemAlumnComponent {
  temarios = [
    { parcial: '1' },
    { parcial: '2' },
  ];

}
