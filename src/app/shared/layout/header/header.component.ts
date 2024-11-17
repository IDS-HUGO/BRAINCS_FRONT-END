import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() role: string | null = null;
  isClicked = false;

  toggleAddButton() {
    this.isClicked = !this.isClicked;
  }
}
