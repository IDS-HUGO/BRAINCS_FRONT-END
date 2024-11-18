import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-group',
  templateUrl: './header-group.component.html',
  styleUrls: ['./header-group.component.css']
})
export class HeaderGroupComponent {
  @Output() viewSelected = new EventEmitter<string>();
  @Input() userType: string = 'alumno';

  constructor(private router: Router) {}

  selectView(view: string) {
    this.viewSelected.emit(view);
  }

  backToHome(): void {
    this.router.navigate(['/home']);
  }
}