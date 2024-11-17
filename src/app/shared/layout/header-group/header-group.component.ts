import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-group',
  templateUrl: './header-group.component.html',
  styleUrls: ['./header-group.component.css']
})
export class HeaderGroupComponent {
  @Output() viewSelected = new EventEmitter<string>();

  constructor(private router: Router) {}

  selectView(view: string) {
    this.viewSelected.emit(view);
  }

  backToHome(): void {
    this.router.navigate(['/home']);
  }
}