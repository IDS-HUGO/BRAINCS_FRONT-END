import { Component } from '@angular/core';

@Component({
  selector: 'app-view-group-alumn',
  templateUrl: './view-group-alumn.component.html',
  styleUrl: './view-group-alumn.component.css'
})
export class ViewGroupAlumnComponent {
  selectedView: string = 'activity';

  onViewSelected(view: string) {
    this.selectedView = view;
  }

}
