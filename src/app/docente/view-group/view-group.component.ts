import { Component } from '@angular/core';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.css'
})
export class ViewGroupComponent {

  selectedView: string = 'activity';

  onViewSelected(view: string) {
    this.selectedView = view;
  }

}
