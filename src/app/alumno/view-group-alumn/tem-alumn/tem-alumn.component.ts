import { Component, OnInit } from '@angular/core';
import { TemarioService } from '../../services/temario.service';
import { Temario } from '../../models/temario';

@Component({
  selector: 'app-tem-alumn',
  templateUrl: './tem-alumn.component.html',
  styleUrl: './tem-alumn.component.css'
})

export class TemAlumnComponent implements OnInit {
  temarios: Temario[] = [];
  selectedTemario: Temario | null = null; 
  isModalOpen = false;

  constructor(private temarioService: TemarioService) {}
  ngOnInit() {
    this.loadTemarios();
  }
  loadTemarios() {
    
    this.temarioService.getTemarioByGroupId().subscribe({
      next: (response) => {
        this.temarios = response;
        console.log('Temarios cargados:', this.temarios);
      },
      error: (error) => {
        console.error('Error al obtener los temarios:', error.message);
      },
    });
  }

  openTemarioModal(temario: Temario) {
    this.selectedTemario = temario;
    this.isModalOpen = true;
  }

  closeTemarioModal() {
    this.isModalOpen = false;
  }
}