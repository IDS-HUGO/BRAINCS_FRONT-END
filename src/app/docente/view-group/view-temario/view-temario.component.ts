import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemarioService } from '../../services/temario.service';

@Component({
  selector: 'app-view-temario',
  templateUrl: './view-temario.component.html',
  styleUrls: ['./view-temario.component.css']
})
export class ViewTemarioComponent implements OnInit {
  temarios: any[] = [];
  groupId: number = 0;

  @Output() addTarea = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private temarioService: TemarioService
  ) {}

  ngOnInit(): void {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del grupo:', this.groupId);

    if (this.groupId) {
      this.loadTemarios();
    }
  }

  loadTemarios(): void {
    this.temarioService.getTemarios(this.groupId).subscribe(
      (response) => {
        console.log('Respuesta de temarios:', response);
        this.temarios = response;
      },
      (error) => {
        console.error('Error al cargar temarios:', error);
      }
    );
  }
}