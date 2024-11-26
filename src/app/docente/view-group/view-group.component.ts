import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.css'
})
export class ViewGroupComponent implements OnInit {

  selectedView: string = 'activity';
  constructor (private route: ActivatedRoute) {}

  onViewSelected(view: string) {
    this.selectedView = view;
  }
    groupId: number = 0;
    grado: number = 0;
    grupo: string = '';

    ngOnInit(): void {
      this.groupId = Number(this.route.snapshot.paramMap.get('id'));
      this.grado = Number(this.route.snapshot.paramMap.get('grado'));
      this.grupo = this.route.snapshot.paramMap.get('grupo') || '';
  
      console.log('ID del grupo:', this.groupId);
      console.log('Grado:', this.grado);
      console.log('Grupo:', this.grupo);
  
    }
}