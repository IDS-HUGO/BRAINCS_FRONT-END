import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isClicked = false; 

  toggleAddButton() {
    this.isClicked = !this.isClicked; 
  }
}
