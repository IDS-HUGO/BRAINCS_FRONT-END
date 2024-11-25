import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.css'
})
export class ViewGroupComponent implements OnInit {

  selectedView: string = 'activity';
  groupId!: number;

  constructor (private route : ActivatedRoute) {}

  onViewSelected(view: string) {
    this.selectedView = view;
  }

  ngOnInit(): void {
      this.groupId = Number(this.route.snapshot.paramMap.get('id'))
      console.log(this.groupId)
  }

}