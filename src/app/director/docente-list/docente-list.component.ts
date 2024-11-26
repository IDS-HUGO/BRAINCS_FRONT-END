import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../Service/docente.service';
import { Docente } from '../Models/docente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {
  docentes: Docente[] = [];
  showAddDocenteModal: boolean = false;

  constructor(private docenteService: DocenteService, private router: Router) {}

  ngOnInit(): void {
    this.loadDocentes();
  }

  loadDocentes(): void {
    this.docenteService.getDocentes().subscribe((data: Docente[]) => {
      this.docentes = data;
    });
  }

  deleteDocente(id_docente: string): void {
    this.docenteService.deleteDocente(id_docente).subscribe(() => {
      this.loadDocentes();
    });
  }

  openAddDocenteModal(): void {
    this.showAddDocenteModal = true;
  }

  closeAddDocenteModal(): void {
    this.showAddDocenteModal = false;
  }

  editDocente(id_docente: string): void {
    this.router.navigate(['/editar-docente', id_docente]);
  }
}
