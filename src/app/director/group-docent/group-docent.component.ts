import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocenteService } from '../Service/docente.service';
import { GrupoService } from '../Service/grupo.service';
@Component({
  selector: 'app-group-docent',
  templateUrl: './group-docent.component.html',
  styleUrl: './group-docent.component.css'
})
export class GroupDocentComponent {
  docenteId!: number;
  grupos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private grupoService: GrupoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.docenteId = +params['docenteId'];  // Obtener docenteId desde los parámetros de la ruta
      console.log('docenteId recibido:', this.docenteId);  // Verifica que se haya recibido el docenteId
      if (this.docenteId) {
        this.loadGrupos();  // Llamar al método para cargar los grupos
      }
    });
  }

  loadGrupos() {
    this.grupoService.getGruposByDocente(this.docenteId).subscribe(
      (grupos: any[]) => {
        console.log('Grupos recibidos:', grupos);  // Verifica los grupos que se reciben
        this.grupos = grupos;  // Asignamos los grupos al array
      },
      (error) => {
        console.error('Error al obtener los grupos:', error);
      }
    );
  }

}
